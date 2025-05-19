// dom元素及相关资源全部加载完毕

window.addEventListener('load', () => {
  // 路劲导航的数据渲染
  function navPathDataBind() {
    // 1.获取路径导航的页面元素（navPath）
    // 2.获取数据（data.js）
    // 3.根据数据动态生成dom元素
    // 4.最后一个dom元素只生成a标签不生成i标签

    // 1.获取dom
    const navPath = document.querySelector('#wrapper #content .contentMain #navPath')

    // 2.获取数据
    const path = goodData.path

    // 3.遍历数据
    for (let i = 0; i < path.length; i++) {
      if (i !== path.length - 1) {
        let aNode = document.createElement('a');
        aNode.href = path[i].url;
        aNode.innerText = path[i].title;

        let iNode = document.createElement('i');
        iNode.innerText = '/';

        navPath.appendChild(aNode);
        navPath.appendChild(iNode);
      } else {
        let aNode = document.createElement('a');
        aNode.innerText = path[i].title;

        navPath.appendChild(aNode);
      }
    }
  }
  navPathDataBind()

  // 放大镜移入移出效果
  function bigClassBind() {
    // 1.获取小图框元素对象，并且设置移入事件（mouseenter不冒泡）
    // 2.动态显示蒙版、大图框元素和大图片
    // 3.移出时移除蒙版、大图框元素和大图片

    // 1.获取小图框元素对象，并且设置移入事件（mouseenter不冒泡）
    const smallPic = document.querySelector('#wrapper #content .contentMain #center #left .leftTop .smallPic')
    const maskDiv = document.querySelector('#wrapper #content .contentMain #center #left .leftTop .smallPic .mask ')
    const bigPic = document.querySelector('#wrapper #content .contentMain #center #left .leftTop .bigPic')
    const bigImg = document.querySelector('#wrapper #content .contentMain #center #left .leftTop .bigPic img')
    smallPic.addEventListener('mouseenter', () => {
      // 2.动态显示蒙版、大图框元素和大图片
      // 显示蒙版和大图
      // 先显示元素
      maskDiv.style.display = 'block';
      bigPic.style.display = 'block';

      // 使用setTimeout确保display变化后再改变opacity
      setTimeout(() => {
        maskDiv.style.opacity = '1';
        bigPic.style.opacity = '1';
      }, 10)
    })

    // 鼠标在小图框中移动
    smallPic.addEventListener('mousemove', (e) => {
      // 1. 获取鼠标在smallPic中的位置
      // 2. 计算mask应该移动到的位置
      // 3. 控制mask的移动范围，不能超出smallPic
      // 4. 根据mask的位置，计算大图的位置

      // 获取smallPic的位置信息（相对于视图的位置）
      const smallPicRect = smallPic.getBoundingClientRect()

      // 计算鼠标在smallPic内的坐标
      let mouseX = e.clientX - smallPicRect.left
      let mouseY = e.clientY - smallPicRect.top

      // 计算mask的位置（鼠标位置减去mask宽高的一半，使鼠标在mask中心）
      let maskWidth = maskDiv.offsetWidth
      let maskHeight = maskDiv.offsetHeight
      let maskX = mouseX - maskWidth / 2
      let maskY = mouseY - maskHeight / 2

      // 控制mask不超出smallPic的范围
      // 左边界
      if (maskX < 0) {
        maskX = 0
      }
      // 右边界 (smallPic宽度 - mask宽度)
      if (maskX > smallPic.offsetWidth - maskWidth) {
        maskX = smallPic.offsetWidth - maskWidth
      }
      // 上边界
      if (maskY < 0) {
        maskY = 0
      }
      // 下边界 (smallPic高度 - mask高度)
      if (maskY > smallPic.offsetHeight - maskHeight) {
        maskY = smallPic.offsetHeight - maskHeight
      }

      // 设置mask的位置
      maskDiv.style.left = maskX + 'px'
      maskDiv.style.top = maskY + 'px'

      // 计算大图的位置
      // 大图与小图的比例 (大图宽度/小图宽度)
      const ratio = bigImg.offsetWidth / smallPic.offsetWidth

      // 根据比例计算大图应该移动的距离
      const bigImgX = -maskX * ratio
      const bigImgY = -maskY * ratio

      // 设置大图的位置
      bigImg.style.left = bigImgX + 'px'
      bigImg.style.top = bigImgY + 'px'
    })
    // 3.移出时移除蒙版、大图框元素和大图片
    smallPic.addEventListener('mouseleave', () => {
      // 先改变opacity
      maskDiv.style.opacity = '0'

      // 等待过渡完成后隐藏元素
      setTimeout(() => {
        maskDiv.style.display = 'none';
        bigPic.style.display = 'none';
      }, 200) // 与过渡时间相同
    })
  }
  bigClassBind()

  // 缩略图渲染及点击效果
  function navPicBind() {
    // 1.获取数据
    // 2.获取ul元素并根据数据渲染li元素
    // 3.点击缩略图确定其下标，找到小图路径和大图路径替换掉现有src

    // 1.获取数据
    const picList = goodData.imagessrc

    // 2.获取ul元素并根据数据渲染li元素
    const ul = document.querySelector('#wrapper #content .contentMain #center #left .leftBottom .picList ul')
    ul.innerHTML = ''
    for (let i = 0; i < picList.length; i++) {
      const li = document.createElement('li')
      const img = document.createElement('img')
      img.src = picList[i].s
      li.appendChild(img)
      // 为每个li添加点击事件
      li.addEventListener('click', function () {
        // 3.点击缩略图确定其下标，找到小图路径和大图路径替换掉现有src
        const smallImg = document.querySelector('#wrapper #content .contentMain #center #left .leftTop .smallPic img')
        const bigImg = document.querySelector('#wrapper #content .contentMain #center #left .leftTop .bigPic img')

        smallImg.src = picList[i].s
        bigImg.src = picList[i].b
      })

      // 将li添加到ul中
      ul.appendChild(li)


    }


  }
  navPicBind()


  // 左右箭头点击事件
  function arrowBind() {
    // 1.获取左右箭头元素
    // 2.获取可视的div元素、ul元素以及li元素
    // 3.计算（发生起点、步长、总体距离长度）
    // 4.添加点击事件

    // 1.获取左右箭头元素
    const leftArrow = document.querySelector('#wrapper #content .contentMain #center #left .leftBottom a:first-child')
    const rightArrow = document.querySelector('#wrapper #content .contentMain #center #left .leftBottom a:last-child')

    // 2.获取可视的div元素、ul元素以及li元素
    const picList = document.querySelector('#wrapper #content .contentMain #center #left .leftBottom .picList')
    const ul = document.querySelector('#wrapper #content .contentMain #center #left .leftBottom .picList ul')
    const lis = document.querySelectorAll('#wrapper #content .contentMain #center #left .leftBottom .picList ul li')



    // 3.计算
    let start = 0
    let step = lis[0].offsetWidth * 2
    let end = (lis.length - 5) * lis[0].offsetWidth


    // 4.添加点击事件
    leftArrow.addEventListener('click', function () {
      start -= step
      if (start < 0) {
        start = 0
      }
      ul.style.transform = `translateX(-${start}px)`
    })

    rightArrow.addEventListener('click', function () {
      start += step
      if (start > end) {
        start = end
      }
      ul.style.transform = `translateX(-${start}px)`
    })
  }
  arrowBind()
})
