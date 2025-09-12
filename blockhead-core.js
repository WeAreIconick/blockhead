/**
 * Blockhead - ASCII Art Text Generator
 * Converts text into ASCII art using various styles
 */
class Blockhead {
  constructor() {
    // Character patterns (5x7 grid for each character)
    this.patterns = {
      'A': [
        '  █  ',
        ' █ █ ',
        '█   █',
        '█████',
        '█   █',
        '█   █',
        '     '
      ],
      'B': [
        '████ ',
        '█   █',
        '█   █',
        '████ ',
        '█   █',
        '█   █',
        '████ '
      ],
      'C': [
        ' ████',
        '█    ',
        '█    ',
        '█    ',
        '█    ',
        '█    ',
        ' ████'
      ],
      'D': [
        '████ ',
        '█   █',
        '█   █',
        '█   █',
        '█   █',
        '█   █',
        '████ '
      ],
      'E': [
        '█████',
        '█    ',
        '█    ',
        '████ ',
        '█    ',
        '█    ',
        '█████'
      ],
      'F': [
        '█████',
        '█    ',
        '█    ',
        '████ ',
        '█    ',
        '█    ',
        '█    '
      ],
      'G': [
        ' ████',
        '█    ',
        '█    ',
        '█ ███',
        '█   █',
        '█   █',
        ' ████'
      ],
      'H': [
        '█   █',
        '█   █',
        '█   █',
        '█████',
        '█   █',
        '█   █',
        '█   █'
      ],
      'I': [
        '█████',
        '  █  ',
        '  █  ',
        '  █  ',
        '  █  ',
        '  █  ',
        '█████'
      ],
      'J': [
        '█████',
        '    █',
        '    █',
        '    █',
        '    █',
        '█   █',
        ' ████'
      ],
      'K': [
        '█   █',
        '█  █ ',
        '█ █  ',
        '██   ',
        '█ █  ',
        '█  █ ',
        '█   █'
      ],
      'L': [
        '█    ',
        '█    ',
        '█    ',
        '█    ',
        '█    ',
        '█    ',
        '█████'
      ],
      'M': [
        '█   █',
        '██ ██',
        '█ █ █',
        '█   █',
        '█   █',
        '█   █',
        '█   █'
      ],
      'N': [
        '█   █',
        '██  █',
        '█ █ █',
        '█  ██',
        '█   █',
        '█   █',
        '█   █'
      ],
      'O': [
        ' ███ ',
        '█   █',
        '█   █',
        '█   █',
        '█   █',
        '█   █',
        ' ███ '
      ],
      'P': [
        '████ ',
        '█   █',
        '█   █',
        '████ ',
        '█    ',
        '█    ',
        '█    '
      ],
      'Q': [
        ' ███ ',
        '█   █',
        '█   █',
        '█   █',
        '█ █ █',
        '█  ██',
        ' ████'
      ],
      'R': [
        '████ ',
        '█   █',
        '█   █',
        '████ ',
        '█ █  ',
        '█  █ ',
        '█   █'
      ],
      'S': [
        ' ████',
        '█    ',
        '█    ',
        ' ███ ',
        '    █',
        '    █',
        '████ '
      ],
      'T': [
        '█████',
        '  █  ',
        '  █  ',
        '  █  ',
        '  █  ',
        '  █  ',
        '  █  '
      ],
      'U': [
        '█   █',
        '█   █',
        '█   █',
        '█   █',
        '█   █',
        '█   █',
        ' ███ '
      ],
      'V': [
        '█   █',
        '█   █',
        '█   █',
        '█   █',
        '█   █',
        ' █ █ ',
        '  █  '
      ],
      'W': [
        '█   █',
        '█   █',
        '█   █',
        '█   █',
        '█ █ █',
        '██ ██',
        '█   █'
      ],
      'X': [
        '█   █',
        ' █ █ ',
        '  █  ',
        '  █  ',
        '  █  ',
        ' █ █ ',
        '█   █'
      ],
      'Y': [
        '█   █',
        '█   █',
        ' █ █ ',
        '  █  ',
        '  █  ',
        '  █  ',
        '  █  '
      ],
      'Z': [
        '█████',
        '    █',
        '   █ ',
        '  █  ',
        ' █   ',
        '█    ',
        '█████'
      ],
      '0': [
        ' ███ ',
        '█   █',
        '█  ██',
        '█ █ █',
        '██  █',
        '█   █',
        ' ███ '
      ],
      '1': [
        '  █  ',
        ' ██  ',
        '  █  ',
        '  █  ',
        '  █  ',
        '  █  ',
        '█████'
      ],
      '2': [
        ' ███ ',
        '█   █',
        '    █',
        '   █ ',
        '  █  ',
        ' █   ',
        '█████'
      ],
      '3': [
        ' ███ ',
        '█   █',
        '    █',
        '  ██ ',
        '    █',
        '█   █',
        ' ███ '
      ],
      '4': [
        '   █ ',
        '  ██ ',
        ' █ █ ',
        '█  █ ',
        '█████',
        '   █ ',
        '   █ '
      ],
      '5': [
        '█████',
        '█    ',
        '████ ',
        '    █',
        '    █',
        '█   █',
        ' ███ '
      ],
      '6': [
        ' ███ ',
        '█   █',
        '█    ',
        '████ ',
        '█   █',
        '█   █',
        ' ███ '
      ],
      '7': [
        '█████',
        '    █',
        '   █ ',
        '  █  ',
        ' █   ',
        '█    ',
        '█    '
      ],
      '8': [
        ' ███ ',
        '█   █',
        '█   █',
        ' ███ ',
        '█   █',
        '█   █',
        ' ███ '
      ],
      '9': [
        ' ███ ',
        '█   █',
        '█   █',
        ' ████',
        '    █',
        '█   █',
        ' ███ '
      ],
      ' ': [
        '     ',
        '     ',
        '     ',
        '     ',
        '     ',
        '     ',
        '     '
      ],
      '!': [
        '  █  ',
        '  █  ',
        '  █  ',
        '  █  ',
        '  █  ',
        '     ',
        '  █  '
      ],
      '?': [
        ' ███ ',
        '█   █',
        '    █',
        '   █ ',
        '  █  ',
        '     ',
        '  █  '
      ],
      '.': [
        '     ',
        '     ',
        '     ',
        '     ',
        '     ',
        '     ',
        '  █  '
      ],
      ',': [
        '     ',
        '     ',
        '     ',
        '     ',
        '     ',
        '  █  ',
        ' █   '
      ],
      ':': [
        '     ',
        '     ',
        '  █  ',
        '     ',
        '     ',
        '  █  ',
        '     '
      ],
      ';': [
        '     ',
        '     ',
        '  █  ',
        '     ',
        '     ',
        '  █  ',
        ' █   '
      ],
      '-': [
        '     ',
        '     ',
        '     ',
        '█████',
        '     ',
        '     ',
        '     '
      ],
      '_': [
        '     ',
        '     ',
        '     ',
        '     ',
        '     ',
        '     ',
        '█████'
      ]
    };
  }

  /**
   * Main API function - converts text to ASCII art
   * @param {string} text - The text to convert
   * @param {string} style - The style to apply (default: 'block')
   * @returns {string} ASCII art representation of the text
   */
  textToASCII(text, style = 'block') {
    if (!text || typeof text !== 'string') {
      return '';
    }

    const upperText = text.toUpperCase();
    const lines = ['', '', '', '', '', '', ''];
    
    for (let i = 0; i < upperText.length; i++) {
      const char = upperText[i];
      const pattern = this.patterns[char] || this.patterns[' '];
      
      for (let lineIndex = 0; lineIndex < 7; lineIndex++) {
        lines[lineIndex] += pattern[lineIndex];
        if (i < upperText.length - 1) {
          lines[lineIndex] += ' '; // Add spacing between characters
        }
      }
    }

    let result = lines.join('\n');

    // Apply style transformations
    switch (style) {
      case 'classic':
        result = this.convertToClassicASCII(result);
        break;
      case 'minimal':
        result = this.convertToMinimalASCII(result);
        break;
      case 'double':
        result = this.convertToDoubleASCII(result);
        break;
      case 'dots':
        result = this.convertToDotsASCII(result);
        break;
      case 'pipes':
        result = this.convertToPipesASCII(result);
        break;
      case 'retro':
        result = this.convertToRetroASCII(result);
        break;
      case 'outline':
        result = this.convertToOutlineASCII(result);
        break;
      case 'shadow':
        result = this.convertToShadowASCII(result);
        break;
      case 'gradient':
        result = this.convertToGradientASCII(result);
        break;
    }

    return result;
  }

  /**
   * Get list of available characters
   * @returns {Array} Array of supported characters
   */
  getAvailableChars() {
    return Object.keys(this.patterns);
  }

  /**
   * Get list of available styles
   * @returns {Array} Array of style names
   */
  getAvailableStyles() {
    return [
      'block', 'classic', 'minimal', 'double', 'dots', 
      'pipes', 'retro', 'outline', 'shadow', 'gradient'
    ];
  }

  // Style conversion methods
  convertToClassicASCII(blockText) {
    return blockText.replace(/█/g, '#');
  }

  convertToMinimalASCII(blockText) {
    return blockText.replace(/█/g, '*');
  }

  convertToDoubleASCII(blockText) {
    return blockText.replace(/█/g, '▓');
  }

  convertToDotsASCII(blockText) {
    return blockText.replace(/█/g, '•');
  }

  convertToPipesASCII(blockText) {
    const lines = blockText.split('\n');
    return lines.map((line, lineIndex) => {
      let result = '';
      for (let i = 0; i < line.length; i++) {
        if (line[i] === '█') {
          if (lineIndex === 0 || lineIndex === 6) {
            result += '-';
          } else if (i === 0 || (i > 0 && line[i-1] === ' ')) {
            result += '|';
          } else if (i === line.length - 1 || (i < line.length - 1 && line[i+1] === ' ')) {
            result += '|';
          } else {
            result += '=';
          }
        } else {
          result += line[i];
        }
      }
      return result;
    }).join('\n');
  }

  convertToRetroASCII(blockText) {
    return blockText.replace(/█/g, '▉');
  }

  convertToOutlineASCII(blockText) {
    const lines = blockText.split('\n');
    return lines.map((line, lineIndex) => {
      let result = '';
      for (let i = 0; i < line.length; i++) {
        if (line[i] === '█') {
          const isTopEdge = lineIndex === 0 || (lineIndex > 0 && lines[lineIndex - 1][i] !== '█');
          const isBottomEdge = lineIndex === lines.length - 1 || (lineIndex < lines.length - 1 && lines[lineIndex + 1][i] !== '█');
          const isLeftEdge = i === 0 || line[i - 1] !== '█';
          const isRightEdge = i === line.length - 1 || line[i + 1] !== '█';
          
          if (isTopEdge || isBottomEdge || isLeftEdge || isRightEdge) {
            result += '█';
          } else {
            result += ' ';
          }
        } else {
          result += line[i];
        }
      }
      return result;
    }).join('\n');
  }

  convertToShadowASCII(blockText) {
    const lines = blockText.split('\n');
    const result = [];
    
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      let line = '';
      for (let i = 0; i < lines[lineIndex].length; i++) {
        if (lines[lineIndex][i] === '█') {
          line += '█';
        } else {
          const hasBlockAbove = lineIndex > 0 && lines[lineIndex - 1][i] === '█';
          const hasBlockLeft = i > 0 && lines[lineIndex][i - 1] === '█';
          
          if (hasBlockAbove || hasBlockLeft) {
            line += '▒';
          } else {
            line += ' ';
          }
        }
      }
      result.push(line);
    }
    
    return result.join('\n');
  }

  convertToGradientASCII(blockText) {
    const gradientChars = ['█', '▓', '▒', '░'];
    const lines = blockText.split('\n');
    
    return lines.map((line, lineIndex) => {
      return line.split('').map((char, charIndex) => {
        if (char === '█') {
          const gradientIndex = (lineIndex + charIndex) % gradientChars.length;
          return gradientChars[gradientIndex];
        }
        return char;
      }).join('');
    }).join('\n');
  }
}

// ES Module export for WordPress blocks
export default Blockhead;

// Usage example:
/*
import Blockhead from './blockhead-core.js';

const blockhead = new Blockhead();

// Basic usage
const ascii = blockhead.textToASCII("HELLO");
console.log(ascii);

// With style
const classic = blockhead.textToASCII("HELLO", "classic");
console.log(classic);

// Get available options
console.log('Available characters:', blockhead.getAvailableChars());
console.log('Available styles:', blockhead.getAvailableStyles());
*/