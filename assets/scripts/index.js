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
        // padStart(2, '0') = '5' => '05'
        const day = date.getDate().toString().padStart(2, '0');
        const ymd = `${year}-${month}-${day}`;
        const hour = date.getHours().toString().padStart(2,'0');
        const minutes = date.getMinutes().toString().padStart(2,'0');
        const seconds = date.getSeconds().toString().padStart(2,'0');
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
        e.preventDefault()
        const url = {
            google: `https://www.google.com/search?q=${$searchForm['keyword'].value}`,
            naver: `https://search.naver.com/search.naver?query=${$searchForm['keyword'].value}`
        }[$searchForm['site'].value];
        open(url, '_blank');
    }
}


