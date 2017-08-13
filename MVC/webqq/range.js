/**
 * Created by faye on 2017/6/30.
 */
define(function(require,exports,module){
    function range(val,max,min){
        if(val>max){
            return max;
        }else if(val <min){
            return min;
        }else{
            return val;
        }
    }
    exports.range=range;
});