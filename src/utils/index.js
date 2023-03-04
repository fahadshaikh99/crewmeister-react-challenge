const ics = require('ics')

export const handleExportToOutlook = (event) => {

    const { name, startDate, endDate } = event;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const eventObj = {
        title: name,
        start: [start.getFullYear(), start.getMonth() + 1, start.getDate(), start.getHours(), start.getMinutes()],
        end: [end.getFullYear(), end.getMonth() + 1, end.getDate(), end.getHours(), end.getMinutes()]
    };
    ics.createEvent(eventObj, (error, value) => {
        if (error) {
            console.log(error);
            return;
        }
        const element = document.createElement('a');
        element.setAttribute('href', `data:text/calendar;charset=utf-8,${encodeURIComponent(value)}`);
        element.setAttribute('download', `${name}.ics`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    });
};