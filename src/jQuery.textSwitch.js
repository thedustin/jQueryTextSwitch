/**
 * Created with JetBrains PhpStorm.
 * User: Dustin
 * Date: 24.08.13
 * Time: 21:17
 * To change this template use File | Settings | File Templates.
 */

(function($, win){

    var _oDefault = {
        "duration": 500,
        "effect": "fade",
        "callback": function(){}
    };

    function getDataKey(sKey){
        return "dust.text_switch." + sKey;
    }

    /**
     * @syntax $.textSwitch(newString: str[, duration: int = 500[, opts: object = {}]]);
     */
    $.fn.textSwitch = function(sNewStr, mOpts){
        var _oConf;

        if(!sNewStr instanceof String){
            throw new TypeError("jQuery.textSwitch :: newStr");
        }

        if(mOpts){
            if(!$.isPlainObject(mOpts)){
                mOpts = {
                    "duration": mOpts
                }
            }
        } else {
            mOpts = {};
        }

        mOpts = $.extend(_oDefault, mOpts);

        _oConf = this.data(getDataKey("conf"), mOpts).data(getDataKey("conf"));

        return this.each(function(){
            var _oSelf = $(this);

            if(_oConf.effect === "fade"){
                _oSelf.fadeTo(_oConf.duration, 0.0, function(){
                    _oSelf.text(sNewStr).fadeTo(_oConf.duration, 1.0, _oConf.callback);
                });
            } else if(_oConf.effect === "charFade"){
                var _sOld = _oSelf.text(),
                    _aChars = _sOld.split(""),
                    _oUselessChars = $();

                while(_aChars.length < sNewStr.length){
                    _aChars.push("");
                }

                _oSelf.empty();

                $.each(_aChars, function(i, sChar){
                    _oSelf.append("<span class='dust-text-switch-char'>" + sChar + "</span>");
                });

                var _oDeferred;
                var _oChars = _oSelf.children().each(function(i){
                    var _oChar = $(this).delay(i * (_oConf.duration / 10)).fadeTo(_oConf.duration, 0.0, function(){
                        if(sNewStr[i]){
                            _oChar.text(sNewStr[i]).fadeTo(_oConf.duration, 1.0, _oConf.callback);
                        } else {
                            _oUselessChars = _oUselessChars.add(_oChar);
                        }
                    });

                    _oDeferred = _oChar.promise();
                });

                if(_oDeferred){
                    _oDeferred.then(function(){
                        _oUselessChars.remove();
                        _oConf.callback();
                    });
                }

            } else {
                throw new TypeError("jQuery.textSwitch :: Conf.effect");
            }

        });
    }

})(jQuery, window);