
function addReady(fn)
{
	if (document.addEventListener)
	{
		document.addEventListener('DOMContentLoaded', fn, false);
	}
	else
	{
		document.attachEvent('onreadystatechange', function (){
			if (document.readyState == 'complete')
			{
				fn();
			}
		});
	}	
}


function addWheel(obj, fn)
{
	function _wheel(ev)
	{
		var oEvent=ev || event;
		var down=false;
		
		if (oEvent.wheelDelta)
		{
			down=oEvent.wheelDelta>0 ? false : true;
		}
		else
		{
			down=oEvent.detail>0 ? true : false;
		}
		
		fn && fn(down);
		//alert(oEvent.preventDefault);
		oEvent.preventDefault && oEvent.preventDefault();
		return false;
	}
	
	
	
	if (window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1)
	{
		obj.addEventListener('DOMMouseScroll', _wheel, false);
	}
	else
	{
		obj.onmousewheel=_wheel;
	}
}

function addEvent(obj, sEv, fn)
{
	if (obj.addEventListener)
	{
		obj.addEventListener(sEv, fn, false);
	}
	else
	{
		obj.attachEvent('on'+sEv, fn);
	}
}

function removeEvent(obj, sEv, fnName)
{
	if (obj.removeEventListener)
	{
		obj.removeEventListener(sEv, fnName, false);
	}
	else
	{
		obj.detachEvent('on'+sEv, fnName);
	}
}










