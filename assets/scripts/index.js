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