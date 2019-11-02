function tap(obj, callback) {
    var first_in = true,
        start_x = 0,
        start_y = 0,
        is_move = false;

    obj.addEventListener('touchmove', event_touchmove);
    obj.addEventListener('touchend', event_touchend);

    function event_touchmove(e) {
        var point = e.changedTouches[0];

        if (first_in) {
            first_in = false;
            start_x = point.pageX;
            start_y = point.pageY;
        } else {
            var change_x = point.pageY - start_x;
            var change_y = point.pageY - start_y;
            if (Math.abs(change_x) > 10 || Math.abs(change_y) > 10) {
                is_move = true;
            }
        }
    }

    function event_touchend(e) {
        if (!is_move) {
            callback(obj);
        }
        obj.removeEventListener('touchmove', event_touchmove);
        obj.removeEventListener('touchend', event_touchend);
    }
}