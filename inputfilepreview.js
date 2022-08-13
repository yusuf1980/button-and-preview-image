/*! Input File Button & Preview 2022-08-10
* https://github.com/yusuf1980/inputfilepreview.js
* version: 1.0
*/

let InputFilePreview = (function() {
  'use strict'; 

//
// Get new and default options 
// Then compare with default property of default options
// Avoid new property that is not owned propery of default options
//
function getOptions(options, defaults) {
    if(isPlainObject(options)) {
        var newOptions = {};
        for (var i in defaults) 
        {
            // It will avoid new values that isn't owned property of default option
            if(defaults.hasOwnProperty(i)) 
            {
                // if new option have no option defaults will to else
                if(options[i] !== undefined) 
                {    
                    newOptions[i] = mergeOption(options[i], defaults[i]);
                }
                else {
                    newOptions[i] = defaults[i];
                }
            }
        }
        return newOptions;
    }
    else {
        return defaults; 
    }
}

/*
* Check if new options use the right object
 */
function isPlainObject(obj) {
    return !!obj && typeof obj === "object" && obj.constructor === Object;
}

/*
* It's next of getOptions function
 */
function mergeOption(newValues, defaultValues) {
    // check if new values and defaults is object and array
    if(defaultValues instanceof Object && newValues instanceof Object )
    {
        // check if the values is array
        if (defaultValues instanceof Array && newValues instanceof Array)
        {
            // if values is array
            defaultValues = [];
            return defaultValues.concat(newValues);
        }
        if (typeof defaultValues === "function" && typeof newValues === "function")
         {
             return newValues;
         }
        else {
            // if values is object
            return secondMerge(newValues, defaultValues);
        }
    }

    return newValues;
}

function secondMerge(newValues, defaultValues) {
    if(newValues instanceof Object && defaultValues instanceof Object) {
        var newVal = {};
        for(var i in defaultValues) 
        {
            if( defaultValues.hasOwnProperty(i) ) 
            {
                if(newValues[i] !== undefined) 
                {
                    newVal[i] = newValues[i];
                }
                else 
                {
                    newVal[i] = defaultValues[i];
                }
                
            }
        }
    }
    return newVal;
}
   
// adding styles to element
function addStyles(el, styles) {
    for (var i in styles) {
        el.style[i] = styles[i]; 
    }
}

function isElement(o) {
    return (typeof HTMLElement === "object"? o instanceof HTMLElement:
    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string")
}

// function imageDestroy(el) {
//     var getimg = el.querySelector('img');
//     if(getimg) {
//         getimg.remove();
//     }
//     return el;
// }

function InputFilePreview(elid, options) {
    if(elid.jquery) 
    {
        elid = elid[0];
    }
    if(!isElement(elid)) 
    {
        alert('use right element')
        return;
    }
    this.elid = elid;
    // this.elinput = elid;

    // all option defaults
    this._options = {
        buttonText: "Choose Image",
        name: 'filename',
        showInfo: true,
        showPreview: true,
        previewStyles: {
            'max-width': '200px',
            'max-height': '200px',
            'border-radius': '10px',
            'border': '3px solid #ccc',
            'margin-bottom': 0
        },
        acceptType:  ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'],
        onChange: function(event, imagesrc){}
    }

    //process of new options to default options
    this._options = getOptions(options, this._options);

    if(this.elid.getElementsByTagName('input')[0]) {
        this.elinput = this.elid.getElementsByTagName('input')[0];
    }

    this._createElements();

    this.elStatus = this.elinput.parentElement.querySelector('.inbfilename');

    if(this.elinput.tagName !== 'INPUT') 
    {
        this.elStatus.textContent = "Something wrong, use \"<input />\" Tag Name!";
        return
    }

    // check is type of input element is file type
    if(this.elinput.type !== 'file') 
    {
        this.elStatus.textContent = "Something wrong, use type \"file\" for this input!"; 
        return 
    } 

    var files = this.elinput;

    files.addEventListener('change', (e) => { 
        var [file] = e.target.files;
        if(this.isFileImage(file)) {
            this.change(file, e);
        }
    });

    return;
}

InputFilePreview.prototype = {
    _createElements : function() {
        var self = this;
        var children = self.elid.children;

        if(!this.elinput) {
            this._createWrapperInput();
            this.elinput = this.elid.getElementsByTagName('input')[0];
        }
        self._inputStyle();
        self._createLabel();
        self._createParagraph();
        self._createPreview();
    },
    _createWrapperInput: function() {
        var div = document.createElement('div');
        div.appendChild(this._createInput())
        this.elid.appendChild(div)
    },
    _createInput: function() {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.name = this._options.name;
        return input;
    },
    _inputStyle: function() {
        var acceptType = this._options.acceptType,
            styles = {
            'opacity': 0,
            'width': '0.1px',
            'height': '0.1px',
            'position': 'absolute'
            },
            elinput = this.elinput,
            accept = '';

        for (var i=0; i < acceptType.length; i++ ) {
            accept += acceptType[i];
            if(( i + 1) != acceptType.length) {
                accept += ', ';
            }
        }
        elinput.setAttribute("accept", accept);
        elinput.setAttribute('id', `buttoninputid-${this.elid.id}`);

        addStyles(elinput, styles);
    },
    // create label/button
    _createLabel : function() {
        var label = document.createElement("label");
        label.setAttribute("for", this.elinput.id);
        label.textContent = this._options.buttonText;
        label.setAttribute("class", "inblabel")
        this.elinput.parentElement.appendChild(label)
        var styles = {
            'display': 'block',
            'position': 'relative',
            'width': '150px',
            'height': '40px',
            'border-radius': '25px',
            // 'background': 'linear-gradient(40deg, #ff6ec4, #7873f5)',
            'background': '#9c27b0',
            'box-shadow': '0 4px 7px rgba(0, 0, 0, 0.4)',
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'color': '#fff',
            'font-weight': 'bold',
            'cursor': 'pointer'
        };
        addStyles(label, styles)
    },
    // paragraph for info name and size file
    _createParagraph : function() {
        var para =  document.createElement("p");
        para.classList.add("inbfilename");
        this.elinput.parentElement.appendChild(para);
        var styles = {
            'font-size': '0.85rem',
            'color': '#555'
        }
        addStyles(para, styles);
    },
    _createPreview: function() {
        var preview = this.elid.querySelector('.inbpreview');
        if(!preview) {
            var taginbpreview = document.createElement('div');
            taginbpreview.setAttribute('class','inbpreview');
            this.elid.appendChild(taginbpreview);
            preview = taginbpreview;
        }
        preview.style.marginBottom = '15px';

    },
    _previewStyle: function() {
        taginbpreview.style.marginBottom = "15px";
    },
    isFileImage: function(file) {
        const acceptedImageTypes = this._options.acceptType;
     
        return file && acceptedImageTypes.includes(file['type'])
    },
    change: function(file, event) {
        // if (this._options.onChange.call(this, event, file) === false) {
        //     return;
        // }
        var nameTag = this.elid.querySelector('.inbpreview');

        var reader = new FileReader();
            reader.onload = (function (options) {
                return function(f) {
                    nameTag.innerHTML = '<img>';
                    var img = nameTag.querySelector('img');
                    img.src = f.target.result;
                    addStyles(img, options.previewStyles);
                    options.onChange.call(this, event, f.target.result);
                }
            })(this._options);

        if(this._options.showPreview) {
            reader.readAsDataURL(file);
        }

        if(this._options.showInfo) {
            // get namefile and size
            // const [fil] = event.target.files;
            const { name: fileName, size } = file;
            const fileSize = (size / 1000).toFixed(2);
            const fileNameAndSize = `${fileName} - ${fileSize}KB`;
            this.elStatus.textContent = fileNameAndSize;
        }
    }
}
  
return InputFilePreview;

}());