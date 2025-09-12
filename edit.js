import { __ } from '@wordpress/i18n';
import { useMemo, useRef, useEffect, useState } from '@wordpress/element';
import { useBlockProps, InspectorControls, BlockControls } from '@wordpress/block-editor';
import { TextControl, Button, Panel, PanelBody } from '@wordpress/components';
import './editor.scss';
import Blockhead from './blockhead-core.js';

const blockHead = new Blockhead();
const availableStyles = blockHead.getAvailableStyles();

function StyleCard({ styleKey, isActive, onClick, onKeyDown }) {
	return (
		<Button
			isPressed={ isActive }
			variant={ isActive ? 'primary' : 'secondary' }
			onClick={ () => onClick(styleKey) }
			className={ 'blockhead-style-card' + (isActive ? ' is-active' : '') }
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: isActive ? '#eef4fb' : '#fff',
				border: isActive ? '2px solid #21759b' : '1px solid #ddd',
				boxShadow: isActive ? '0 2px 8px rgba(33,117,155,0.11)' : '0 1px 3px rgba(0,0,0,0.02)',
				borderRadius: '9px',
				cursor: 'pointer',
				padding: '0',
				transition: 'border 0.14s, background 0.12s, box-shadow 0.14s',
			}}
			role="option"
			tabIndex="0"
			title={ __( styleKey.charAt(0).toUpperCase() + styleKey.slice(1), 'blockhead-block-wp' ) }
			onKeyDown={ onKeyDown }
		>
			<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
				<span style={{
					fontSize: '1.45rem',
					fontWeight: 700,
					color: '#242d34',
					lineHeight: 1.2,
					whiteSpace: 'normal',
					marginBottom: 0,
					letterSpacing: '0.5px',
				}}>{ styleKey.charAt(0).toUpperCase() + styleKey.slice(1) }</span>
			</div>
		</Button>
	);
}

export default function Edit({ attributes, setAttributes, clientId, context }) {
	const { text = '', style = 'block', align } = attributes;
	const [fontSize, setFontSize] = useState('1em');
	const preRef = useRef();
	const containerRef = useRef();

	const ascii = useMemo(
		() => blockHead.textToASCII(text, style),
		[text, style]
	);

	// Responsive font size that ensures the ASCII art never wraps
	useEffect(() => {
		if (!preRef.current || !containerRef.current) return;
		const containerWidth = containerRef.current.offsetWidth;
		const asciiLines = ascii.split('\n');
		const maxLength = asciiLines.reduce((acc, l) => Math.max(acc, l.length), 1);
		// Measure with a test span
		const span = document.createElement('span');
		span.style.visibility = 'hidden';
		span.style.fontFamily = 'monospace';
		span.style.position = 'absolute';
		span.textContent = '█'.repeat(maxLength);
		preRef.current.appendChild(span);
		const asciiPixelWidth = span.offsetWidth;
		preRef.current.removeChild(span);
		let scale = 1;
		if (asciiPixelWidth > 0) {
			scale = containerWidth / asciiPixelWidth;
		}
		const minFontSize = 10; // px
		const maxFontSize = 48; // px
		let fontSizePx = Math.round(Math.max(minFontSize, Math.min(maxFontSize, 24*scale)));
		setFontSize(`${fontSizePx}px`);
	}, [ascii, text, style]);

	// Keyboard arrow for style quick navigation
	const onButtonKeyDown = (event) => {
		const idx = availableStyles.indexOf(style);
		if (event.key === 'ArrowRight' && idx < availableStyles.length - 1) {
			setAttributes({ style: availableStyles[idx + 1] });
			event.preventDefault();
		} else if (event.key === 'ArrowLeft' && idx > 0) {
			setAttributes({ style: availableStyles[idx - 1] });
			event.preventDefault();
		}
	};

	// Arrange style cards in a 5x2 grid (2 cols, 5 rows)
	const styleGridRows = 5;
	const styleGridCols = 2;
	const gridCards = [];
	for (let r = 0; r < styleGridRows; r++) {
		const row = availableStyles.slice(r*styleGridCols, (r+1)*styleGridCols);
		gridCards.push(row);
	}

	const blockProps = useBlockProps({
		className: align ? `has-text-align-${align}` : undefined,
		style: align ? { textAlign: align } : undefined,
	});

	return (
		<div ref={containerRef} { ...blockProps }>
			<BlockControls group="block">
				{/* No manual alignment controls here; handled by supports.align */}
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Blockhead settings', 'blockhead-block-wp' ) } initialOpen={ true }>
					<TextControl
						label={ __( 'ASCII Text', 'blockhead-block-wp' ) }
						value={ text }
						onChange={ ( val ) => setAttributes( { text: val } ) }
					/>
					<div style={{ marginTop: 20 }}>
						<strong>{ __( 'Style', 'blockhead-block-wp' )}</strong>
						<div
							role="listbox"
							aria-label={ __('ASCII Art Styles', 'blockhead-block-wp') }
							className="blockhead-style-cards-grid"
							style={{
								display: 'grid',
								gridTemplateColumns: `repeat(${styleGridCols}, 1fr)` ,
								gridTemplateRows: `repeat(${styleGridRows}, auto)`,
								gap: '13px 10px',
								marginTop: 7,
								maxWidth: 360,
							}}
						>
							{gridCards.map((row, rowIdx) => (
								row.map((styleKey, colIdx) => (
									<StyleCard
										key={styleKey}
										styleKey={styleKey}
										isActive={ style === styleKey }
										onClick={ (s) => setAttributes({ style: s }) }
										onKeyDown={ onButtonKeyDown }
									/>
								))
							))}
						</div>
					</div>
				</PanelBody>
				<PanelBody title={ __( 'Powered by Telex', 'blockhead-block-wp' ) } initialOpen={ false }>
					<p style={{ marginTop:0, marginBottom:8 }}>
						{__('Telex is basically the J.A.R.V.I.S of WordPress development - an AI that builds blocks so you don\'t have to.', 'blockhead-block-wp')}
					</p>
					<a
						href="https://telex.automattic.ai"
						target="_blank"
						rel="noopener noreferrer"
						style={{ textDecoration:'underline', color:'#115078', fontWeight:'bold', display:'inline-block' }}
					>
						{__('Learn more about Telex', 'blockhead-block-wp')}
					</a>
				</PanelBody>
			</InspectorControls>
			<pre
				className="blockhead-ascii-art"
				style={ {
					fontFamily: 'monospace',
					background: 'none',
					padding: 0,
					margin: 0,
					fontSize,
					lineHeight: '1.2',
					whiteSpace: 'pre',
					wordBreak: 'normal',
					maxWidth: '100%',
					overflowX: 'hidden',
					display: 'block',
					textAlign: align || undefined,
				} }
				ref={preRef}
				aria-label={ __( 'ASCII art preview', 'blockhead-block-wp' ) }
				title={ __( 'ASCII art preview', 'blockhead-block-wp' ) }
			>{ ascii }</pre>
		</div>
	);
}
