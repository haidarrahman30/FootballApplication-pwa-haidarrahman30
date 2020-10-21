var convertDate = date => {
    const namaBulan = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return `${date.getDate()} ${namaBulan[date.getMonth()]} ${date.getFullYear()} ${formatAMPM(date)}`
}

function formatAMPM(date) {
    var jam = date.getHours();
    var menit = date.getMinutes();
    var ampm = jam >= 12 ? 'pm' : 'am';
    jam = jam % 12;
    jam = jam ? jam : 12;
    menit = menit < 10 ? '0' + menit : menit;
    var strTime = jam + ':' + menit + ' ' + ampm;
    return strTime;
}