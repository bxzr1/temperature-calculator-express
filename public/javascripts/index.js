const inputField = document.querySelector('input');
const outputField = document.getElementById('output');
const displayHistory = document.getElementById('displayHistory');

const handleNumberButton = (num) => {
    const previous = inputField.value;
    console.log(previous, num);
    inputField.value = previous + String(num);
}

const clearInput = () => {
    inputField.value = undefined;
}

const calculate = () => {
    const kelvin = Number(inputField.value);
    const celcius = Number(kelvin - 273.15).toFixed(2);
    outputField.innerHTML = celcius;
    return celcius;
}

const handleSubmit = async (event) => {
    event.preventDefault();
    outputTemp = calculate();
    console.log("OUTPUT FIELD VALUE", outputField.value)
    const data = await addWeather(outputTemp);
    console.log('DATA', data);
}

const addWeather = async (outputTemp) => {
    const res = await fetch('/', {
        method: 'POST',
        body: JSON.stringify({
            temp: outputTemp,
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();
    return data;
}

const getWeather = async () => {
    const res = await fetch('/history/load');
    const data = await res.json();
    return data;
}

const updateWeather = async (id, newTemp) => {
    const res = await fetch('/history/', {
        method: 'PUT',
        body: JSON.stringify({
            id,
            newTemp,
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

const handleEditSave = async (e) => {
    const editField = e.target.parentElement.firstChild;
    console.log(editField);
    if (e.target.innerHTML === 'Edit') {
        e.target.innerHTML = 'Save';
        editField.setAttribute("contenteditable", "true");
        editField.focus();
    } else {
        e.target.innerHTML = 'Edit';
        editField.setAttribute("contenteditable", "false");
        // fire put request
        const id = editField.id;
        const newTemp = editField.innerHTML;
        await updateWeather(id, newTemp);
    }
}

const deleteWeather = async (id) => {
    const res = await fetch(`/history/${id}`, {
        method: 'DELETE',
    });
    loadHistory();
}

const handleDelete = async (e) => {
    const editField = e.target.parentElement.firstChild;
    console.log(editField.id);
    await deleteWeather(editField.id);
}

const loadHistory = async () => {
    console.log('loading history...');
    const { data } = await getWeather();
    displayHistory.replaceChildren();
    data.forEach(d => {
        const div = document.createElement('div');
        const entry = document.createElement('p');
        const text = document.createTextNode(String(d.output_temp) + d.output_scale);
        entry.setAttribute("id", d.weather_id);
        entry.appendChild(text);

        const editButton = document.createElement('button');
        editButton.innerHTML = 'Edit';
        editButton.onclick = (event) => handleEditSave(event);
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.onclick = (event) => handleDelete(event);

        div.appendChild(entry);
        div.appendChild(editButton);
        div.appendChild(deleteButton);
        displayHistory.appendChild(div);
    })
}


const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);