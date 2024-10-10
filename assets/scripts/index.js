{
    const $bg = document.getElementById('bg');
    const images = [
        './assets/images/bg/1.jpg',
        './assets/images/bg/2.jpg',
        './assets/images/bg/3.jpg',
        './assets/images/bg/4.jpg',
        './assets/images/bg/5.jpg'
    ];
    for (const image of images) {
        const $item = document.createElement('div');
        $item.classList.add('item');
        $item.style.backgroundImage = `url("${image}")`;
        $bg.append($item);
    }
}