const LocalTime = class {
    static calcTime(offset) {
        const d = new Date()
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const offsetInHours = offset/3600;    
        return new Date(utc + (3600000*offsetInHours)).toLocaleString();
    }
}

export {LocalTime}

