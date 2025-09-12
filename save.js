import { useBlockProps } from '@wordpress/block-editor';
import Blockhead from './blockhead-core.js';

export default function save({ attributes }) {
	const { text = '', style = 'block', align } = attributes;
	const blockHead = new Blockhead();
	const ascii = blockHead.textToASCII(text, style);

	const blockProps = useBlockProps.save({
		className: align ? `has-text-align-${align}` : undefined,
		style: align ? { textAlign: align } : undefined,
	});

	return (
		<pre
			{ ...blockProps }
			className="blockhead-ascii-art"
			style={ {
				fontFamily: 'monospace',
				background: 'none',
				padding: 0,
				margin: 0,
				fontSize: '24px',
				lineHeight: '1.2',
				whiteSpace: 'pre',
				wordBreak: 'normal',
				maxWidth: '100%',
				overflowX: 'hidden',
				display: 'block',
				textAlign: align || undefined,
			} }
			aria-label="ASCII art output"
		>
			{ ascii }
		</pre>
	);
}
