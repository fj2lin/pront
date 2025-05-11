const editor = document.getElementById('editor');
let tabCount = 0;
let tabTimeout;

editor.addEventListener('keydown', (event) => {
    if (event.ctrlKey) {
        if (event.key.toLowerCase() === 'z') {
            if (event.shiftKey) {
                document.execCommand('redo');
            } else {
                document.execCommand('undo');
            }
            event.preventDefault();
        }

        switch (event.key.toLowerCase()) {
            case 'b':
                document.execCommand('bold');
                event.preventDefault();
                break;
            case 'u':
                document.execCommand('underline');
                event.preventDefault();
                break;
            case 'r':
                document.execCommand('foreColor', false, 'red');
                event.preventDefault();
                break;
            case 'g':
                document.execCommand('foreColor', false, 'darkgreen');
                event.preventDefault();
                break;
        }
    } else if (event.key === 'Tab') {
        event.preventDefault();
        tabCount++;

        if (tabTimeout) {
            clearTimeout(tabTimeout);
        }

        tabTimeout = setTimeout(() => {
            let prefix = '';
            if (tabCount === 1) {
                prefix = '# ';
            } else if (tabCount === 2) {
                prefix = '  > '; // Using actual spaces
            } else if (tabCount === 3) {
                prefix = '    - '; // Using actual spaces
            }

            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                range.deleteContents();
                const textNode = document.createTextNode(prefix);
                range.insertNode(textNode);
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
            }

            tabCount = 0;
        }, 200);
    } else {
        tabCount = 0;
        if (tabTimeout) {
            clearTimeout(tabTimeout);
        }
    }
});