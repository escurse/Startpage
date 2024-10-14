{
    const $bg = document.getElementById('bg');
    const images = [
        './assets/images/bg/1.jpg',
        './assets/images/bg/2.jpg',
        './assets/images/bg/3.jpg',
        './assets/images/bg/4.jpg',
        './assets/images/bg/5.jpg'
    ];
    const items = [];
    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const $item = document.createElement('div');
        $item.classList.add('item');
        $item.style.backgroundImage = `url("${image}")`;
        if (i === 0) {
            $item.classList.add('--visible');
        }
        items.push($item);
        $bg.append($item);
    }
    const cycleSeconds = 10;
    let currentIndex = 0;
    setInterval(() => {
        items[currentIndex++].classList.remove('--visible');
        if (currentIndex >= items.length) {
            currentIndex = 0;
        }
        items[currentIndex].classList.add('--visible');
    }, cycleSeconds * 1000);
}

{
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const $clock = document.getElementById('clock');
    const $time = $clock.querySelector(':scope > .time');
    const $hour = $time.querySelector(':scope > .hour');
    const $minute = $time.querySelector(':scope > .minute');
    const $second = $time.querySelector(':scope > .second');
    const $date = $clock.querySelector(':scope > .date');
    const $ymd = $date.querySelector(':scope > .ymd');
    const $day = $date.querySelector(':scope > .day');
    const applyDateTime = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const ymd = `${year}-${month}-${day}`;
        const hour = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        $hour.innerText = hour;
        $minute.innerText = minutes;
        $second.innerText = seconds;
        $ymd.innerText = ymd;
        $day.innerText = days[date.getDay()];
    };
    applyDateTime();
    setInterval(applyDateTime, 1000);
}

{
    const $searchForm = document.getElementById('searchForm');
    $searchForm.onsubmit = (e) => {
        e.preventDefault();
        const url = {
            google: `https://www.google.com/search?q=${$searchForm['keyword'].value}`,
            naver: `https://search.naver.com/search.naver?query=${$searchForm['keyword'].value}`,
        }[$searchForm['site'].value];
        open(url, '_blank');
    };
}

{
    const $tileContainer = document.getElementById('tileContainer');
    const $mlbTile = $tileContainer.querySelector(':scope > .tile.mlb');
    const $mlbTileContent = $mlbTile.querySelector(':scope > .content');
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }
        if (xhr.status < 200 || xhr.status >= 300) {
            return;
        }
        const response = JSON.parse(xhr.responseText);
        for (const object of response) {
            const $leftLogo = document.createElement('img');
            $leftLogo.classList.add('logo', 'left');
            $leftLogo.src = object['leftTeamLogo'];
            const $leftName = document.createElement('span');
            $leftName.classList.add('name', 'left');
            $leftName.innerText = object['leftTeamName'];
            $leftName.title = $leftName.innerText;
            const $leftScore = document.createElement('span');
            $leftScore.classList.add('score', 'left');
            $leftScore.innerText = object['leftTeamScore'];
            const $spring = document.createElement('span');
            $spring.classList.add('spring');
            const $rightLogo = document.createElement('img');
            $rightLogo.classList.add('logo', 'right');
            $rightLogo.src = object['rightTeamLogo'];
            const $rightName = document.createElement('span');
            $rightName.classList.add('name', 'right');
            $rightName.innerText = object['rightTeamName'];
            $rightName.title = $rightName.innerText;
            const $rightScore = document.createElement('span');
            $rightScore.classList.add('score', 'right');
            $rightScore.innerText = object['rightTeamScore'];
            const $line = document.createElement('span');
            $line.classList.add('line');
            $line.append($leftLogo, $leftName, $leftScore, $spring, $rightScore, $rightName, $rightLogo);
            $mlbTileContent.append($line);
        }
    };
    xhr.open('GET', 'http://192.168.4.252:8080/api/mlb');
    xhr.send();
    $mlbTileContent.innerHTML = '';
}

{
    const $tileContainer = document.getElementById('tileContainer');
    const $tile = $tileContainer.querySelector(':scope > .tile.weather');
    const $content = $tile.querySelector(':scope > .box.content');
    const date = new Date();
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const url = new URL('https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst');
    url.searchParams.set('serviceKey', 'ubb+OlxX6eAciwn9CaiIjTmsvyt9xeGbp85/Lfcs2R8QhQMQjQ6uFIXGbgrx60fI4VmYtKoj5UkMGbIsBkaeew==');
    url.searchParams.set('nx', '89');
    url.searchParams.set('ny', '90');
    url.searchParams.set('dataType', 'JSON');
    url.searchParams.set('base_date', `${year}${month}${day}`);
    url.searchParams.set('base_time', '0830');
    url.searchParams.set('numOfRows', '60');
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }
        if (xhr.status < 200 || xhr.status >= 300) {
            return;
        }
        const response = JSON.parse(xhr.responseText);
        for (const object of response['response']['body']['items']['item']) {
            if (object['category'] === 'T1H') {
                const $time = document.createElement('span');
                $time.classList.add('time');
                // $time.innerText = `${object['fcstTime'].slice(0, 2)}:${object['fcstTime'].slice(2, 4)}`;
                $time.innerText = `${object['fcstTime'].substring(0, 2)}:${object['fcstTime'].substring(2, 4)}`;
                const $spring = document.createElement('span');
                $spring.classList.add('spring');
                const $temp = document.createElement('span');
                $temp.classList.add('temp');
                $temp.innerHTML = `${object['fcstValue']}&deg;C`;
                // ° => alt + 0176, &deg; => innerHTML로만 작동.
                const $line = document.createElement('span');
                $line.classList.add('line');
                $line.append($time, $spring, $temp);
                $content.append($line);
            }
        }
    };
    xhr.open('GET', url.toString());
    xhr.send();
    $content.innerHTML = '';
}
