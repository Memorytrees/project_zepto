$(function () {
    // 初始化数据
    var direction = {up: 1, right: 2, down: 3, left: 4}
    // 初始化两个坐标
    var now = {col: 1, row: 1};
    var last = {col: 0, row: 0};

    // 初始化变量表示页面没有在滑动
    var isMoving = false;

    // 向上滑动
    $('.page').swipeUp(function () {
        // 判断页面是否在滑动
        if(isMoving) {
            return;
        }
        // 计算滑动之后lastPage页面的坐标
        last.col = now.col;
        last.row = now.row;
        if(last.col < 5) {
            // 计算滑动之后进厂页面的坐标
            now.col = last.col + 1;
            now.row = last.row;
            movePage(direction.up);
        }
        
    });
    // 向下滑动
    $('.page').swipeDown(function () {
        // 判断页面是否在滑动
        if(isMoving) {
            return;
        }
        // 计算滑动之后lastPage页面的坐标
        last.col = now.col;
        last.row = now.row;
        if(last.col > 1) {
            // 计算滑动之后进场页面的坐标
            now.col = last.col - 1;
            now.row = last.row;
            movePage(direction.down);
        }
    });

    // 向左滑动
    $('.page').swipeLeft(function () {
        // 判断页面是否在滑动
        if(isMoving) {
            return;
        }
        // 计算滑动之后lastPage页面的坐标
        last.col = now.col;
        last.row = now.row;
        if(last.col > 1 && last.col < 5 && last.row == 1) {
            // 计算滑动之后进场页面的坐标
            now.col = last.col;
            now.row = last.row + 1;
            movePage(direction.left);
        }
    });

    // 向右滑动
    $('.page').swipeRight(function () {
        // 判断页面是否在滑动
        if(isMoving) {
            return;
        }
        // 计算滑动之后lastPage页面的坐标
        last.col = now.col;
        last.row = now.row;
        if(last.col > 1 && last.col < 5 && last.row == 2) {
            // 计算滑动之后进场页面的坐标
            now.col = last.col;
            now.row = last.row - 1;
            movePage(direction.right);
        }
    });


    // 定义一个滑动的函数
    function movePage(dir) {
        // 初始化参与动画的页面
        var lastPage = '.page-' + last.col + '-' + last.row;
        var nowPage = '.page-' + now.col + '-' + now.row;
        // 初始化两个动画类
        var inClass = '';   // 进场的动画类
        var outClass = '';  // 出厂的动画类
        // 匹配方向
        switch (dir) {
            case direction.up:
                outClass = 'pt-page-moveToTop';
                inClass = 'pt-page-moveFromBottom';
                break;
            case direction.right:
                outClass = 'pt-page-moveToRight';
                inClass = 'pt-page-moveFromLeft';
                break;   
            case direction.down:
                outClass = 'pt-page-moveToDown';
                inClass = 'pt-page-moveFromTop';
                break;
            case direction.left:
                outClass = 'pt-page-moveToLeft';
                inClass = 'pt-page-moveFromRight';
                break;      
        }
        // 将动画类加到参与的动画的页面上
        $(lastPage).addClass(outClass);
        $(nowPage).removeClass('hide');
        $(nowPage).addClass(inClass);
        isMoving = true;

        // 动画执行完清除动画类/扫尾工作
        setTimeout(function () {
            $(lastPage).removeClass(outClass);
            $(lastPage).addClass('hide');
            $(lastPage).removeClass('page-current');
            $(lastPage).find('img').addClass('hide');
            $(nowPage).find('img').removeClass('hide');
            $(nowPage).removeClass(inClass);
            $(nowPage).addClass('page-current');
            isMoving = false;
        },600)
        
    }
})