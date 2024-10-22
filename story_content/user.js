window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
window.Script1 = function()
{
  function CreateInput(dataAttr, storylineVariable, options = {}) {
    var player = GetPlayer();
    var setVar = player.SetVar;
    const selectElement = document.querySelector(`div[data-acc-text='${dataAttr}']`);

    if (!selectElement) {
        console.error(`Element with data-acc-text='${dataAttr}' not found.`);
        return;
    }

    const textarea = document.createElement('textarea');
    const textareaId = `textarea-${storylineVariable}`;
    textarea.id = textareaId;

    textarea.style.width = '100%';
    textarea.style.height = '100%';
    textarea.style.boxSizing = 'border-box';
    textarea.style.resize = 'none';
    textarea.style.backgroundColor = options.backgroundColor || 'white';
    textarea.style.color = options.textColor || 'black';
    textarea.style.border = options.border || '1px solid black';
    textarea.style.fontSize = options.fontSize || '13px';

    // Set the placeholder, either from the options or a default value
    textarea.placeholder = options.placeholder || 'Please enter your text here...';

    if (options.defaultValue !== undefined) {
        textarea.value = options.defaultValue;
        setVar(storylineVariable, options.defaultValue);
    }

    selectElement.appendChild(textarea);

    textarea.addEventListener('input', function() {
        setVar(storylineVariable, textarea.value);
    });

    textarea.addEventListener('blur', function() {
        setVar(storylineVariable, textarea.value);
    });
}

// Example usage
CreateInput('TextEntry', 'Feedback', {
    backgroundColor: '#F2F2F2',
    textColor: '#404040',
    border: 'none',
    fontSize: '13px',
    defaultValue: '',
    placeholder: 'Write your feedback here (Optional)…'
});

}

window.Script2 = function()
{
  function getCurrentDate() {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
  const year = currentDate.getFullYear();
  return `${day}-${month}-${year}`;
}

const player = GetPlayer();


const url = player.GetVar("url");
const course = player.GetVar("Course");
const contentQuality = Number(player.GetVar("R1"));
const uiNavigation = Number(player.GetVar("R2"));
const courseDuration = Number(player.GetVar("R3"));
const feedback = player.GetVar("Feedback");
const date = getCurrentDate();

fetch(url, {
  method: 'POST',
  mode: 'no-cors',
  cache: 'no-cache',
  headers: {
    'Content-Type': 'application/json'
  },
  redirect: 'follow',
  body: JSON.stringify({
    course,
    date,
    contentQuality,
    uiNavigation,
    courseDuration,
    feedback
  })
});
}

};
