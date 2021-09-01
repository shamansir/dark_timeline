(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$element = _Browser_element;
var $author$project$Main$Timeline = function (a) {
	return {$: 'Timeline', a: a};
};
var $elm_community$graph$Graph$Edge = F3(
	function (from, to, label) {
		return {from: from, label: label, to: to};
	});
var $elm_community$graph$Graph$Node = F2(
	function (id, label) {
		return {id: id, label: label};
	});
var $elm_community$graph$Graph$Graph = function (a) {
	return {$: 'Graph', a: a};
};
var $elm_community$graph$Graph$NodeContext = F3(
	function (node, incoming, outgoing) {
		return {incoming: incoming, node: node, outgoing: outgoing};
	});
var $elm_community$intdict$IntDict$Empty = {$: 'Empty'};
var $elm_community$intdict$IntDict$empty = $elm_community$intdict$IntDict$Empty;
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm_community$intdict$IntDict$Inner = function (a) {
	return {$: 'Inner', a: a};
};
var $elm_community$intdict$IntDict$size = function (dict) {
	switch (dict.$) {
		case 'Empty':
			return 0;
		case 'Leaf':
			return 1;
		default:
			var i = dict.a;
			return i.size;
	}
};
var $elm_community$intdict$IntDict$inner = F3(
	function (p, l, r) {
		var _v0 = _Utils_Tuple2(l, r);
		if (_v0.a.$ === 'Empty') {
			var _v1 = _v0.a;
			return r;
		} else {
			if (_v0.b.$ === 'Empty') {
				var _v2 = _v0.b;
				return l;
			} else {
				return $elm_community$intdict$IntDict$Inner(
					{
						left: l,
						prefix: p,
						right: r,
						size: $elm_community$intdict$IntDict$size(l) + $elm_community$intdict$IntDict$size(r)
					});
			}
		}
	});
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$Bitwise$complement = _Bitwise_complement;
var $elm$core$Bitwise$or = _Bitwise_or;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm_community$intdict$IntDict$highestBitSet = function (n) {
	var shiftOr = F2(
		function (i, shift) {
			return i | (i >>> shift);
		});
	var n1 = A2(shiftOr, n, 1);
	var n2 = A2(shiftOr, n1, 2);
	var n3 = A2(shiftOr, n2, 4);
	var n4 = A2(shiftOr, n3, 8);
	var n5 = A2(shiftOr, n4, 16);
	return n5 & (~(n5 >>> 1));
};
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm_community$intdict$IntDict$signBit = $elm_community$intdict$IntDict$highestBitSet(-1);
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $elm_community$intdict$IntDict$isBranchingBitSet = function (p) {
	return A2(
		$elm$core$Basics$composeR,
		$elm$core$Bitwise$xor($elm_community$intdict$IntDict$signBit),
		A2(
			$elm$core$Basics$composeR,
			$elm$core$Bitwise$and(p.branchingBit),
			$elm$core$Basics$neq(0)));
};
var $elm_community$intdict$IntDict$higherBitMask = function (branchingBit) {
	return branchingBit ^ (~(branchingBit - 1));
};
var $elm_community$intdict$IntDict$lcp = F2(
	function (x, y) {
		var branchingBit = $elm_community$intdict$IntDict$highestBitSet(x ^ y);
		var mask = $elm_community$intdict$IntDict$higherBitMask(branchingBit);
		var prefixBits = x & mask;
		return {branchingBit: branchingBit, prefixBits: prefixBits};
	});
var $elm_community$intdict$IntDict$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm_community$intdict$IntDict$leaf = F2(
	function (k, v) {
		return $elm_community$intdict$IntDict$Leaf(
			{key: k, value: v});
	});
var $elm_community$intdict$IntDict$prefixMatches = F2(
	function (p, n) {
		return _Utils_eq(
			n & $elm_community$intdict$IntDict$higherBitMask(p.branchingBit),
			p.prefixBits);
	});
var $elm_community$intdict$IntDict$update = F3(
	function (key, alter, dict) {
		var join = F2(
			function (_v2, _v3) {
				var k1 = _v2.a;
				var l = _v2.b;
				var k2 = _v3.a;
				var r = _v3.b;
				var prefix = A2($elm_community$intdict$IntDict$lcp, k1, k2);
				return A2($elm_community$intdict$IntDict$isBranchingBitSet, prefix, k2) ? A3($elm_community$intdict$IntDict$inner, prefix, l, r) : A3($elm_community$intdict$IntDict$inner, prefix, r, l);
			});
		var alteredNode = function (mv) {
			var _v1 = alter(mv);
			if (_v1.$ === 'Just') {
				var v = _v1.a;
				return A2($elm_community$intdict$IntDict$leaf, key, v);
			} else {
				return $elm_community$intdict$IntDict$empty;
			}
		};
		switch (dict.$) {
			case 'Empty':
				return alteredNode($elm$core$Maybe$Nothing);
			case 'Leaf':
				var l = dict.a;
				return _Utils_eq(l.key, key) ? alteredNode(
					$elm$core$Maybe$Just(l.value)) : A2(
					join,
					_Utils_Tuple2(
						key,
						alteredNode($elm$core$Maybe$Nothing)),
					_Utils_Tuple2(l.key, dict));
			default:
				var i = dict.a;
				return A2($elm_community$intdict$IntDict$prefixMatches, i.prefix, key) ? (A2($elm_community$intdict$IntDict$isBranchingBitSet, i.prefix, key) ? A3(
					$elm_community$intdict$IntDict$inner,
					i.prefix,
					i.left,
					A3($elm_community$intdict$IntDict$update, key, alter, i.right)) : A3(
					$elm_community$intdict$IntDict$inner,
					i.prefix,
					A3($elm_community$intdict$IntDict$update, key, alter, i.left),
					i.right)) : A2(
					join,
					_Utils_Tuple2(
						key,
						alteredNode($elm$core$Maybe$Nothing)),
					_Utils_Tuple2(i.prefix.prefixBits, dict));
		}
	});
var $elm_community$intdict$IntDict$insert = F3(
	function (key, value, dict) {
		return A3(
			$elm_community$intdict$IntDict$update,
			key,
			$elm$core$Basics$always(
				$elm$core$Maybe$Just(value)),
			dict);
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Basics$not = _Basics_not;
var $elm_community$intdict$IntDict$get = F2(
	function (key, dict) {
		get:
		while (true) {
			switch (dict.$) {
				case 'Empty':
					return $elm$core$Maybe$Nothing;
				case 'Leaf':
					var l = dict.a;
					return _Utils_eq(l.key, key) ? $elm$core$Maybe$Just(l.value) : $elm$core$Maybe$Nothing;
				default:
					var i = dict.a;
					if (!A2($elm_community$intdict$IntDict$prefixMatches, i.prefix, key)) {
						return $elm$core$Maybe$Nothing;
					} else {
						if (A2($elm_community$intdict$IntDict$isBranchingBitSet, i.prefix, key)) {
							var $temp$key = key,
								$temp$dict = i.right;
							key = $temp$key;
							dict = $temp$dict;
							continue get;
						} else {
							var $temp$key = key,
								$temp$dict = i.left;
							key = $temp$key;
							dict = $temp$dict;
							continue get;
						}
					}
			}
		}
	});
var $elm_community$intdict$IntDict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm_community$intdict$IntDict$get, key, dict);
		if (_v0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var $elm_community$graph$Graph$fromNodesAndEdges = F2(
	function (nodes_, edges_) {
		var nodeRep = A3(
			$elm$core$List$foldl,
			function (n) {
				return A2(
					$elm_community$intdict$IntDict$insert,
					n.id,
					A3($elm_community$graph$Graph$NodeContext, n, $elm_community$intdict$IntDict$empty, $elm_community$intdict$IntDict$empty));
			},
			$elm_community$intdict$IntDict$empty,
			nodes_);
		var addEdge = F2(
			function (edge, rep) {
				var updateOutgoing = function (ctx) {
					return _Utils_update(
						ctx,
						{
							outgoing: A3($elm_community$intdict$IntDict$insert, edge.to, edge.label, ctx.outgoing)
						});
				};
				var updateIncoming = function (ctx) {
					return _Utils_update(
						ctx,
						{
							incoming: A3($elm_community$intdict$IntDict$insert, edge.from, edge.label, ctx.incoming)
						});
				};
				return A3(
					$elm_community$intdict$IntDict$update,
					edge.to,
					$elm$core$Maybe$map(updateIncoming),
					A3(
						$elm_community$intdict$IntDict$update,
						edge.from,
						$elm$core$Maybe$map(updateOutgoing),
						rep));
			});
		var addEdgeIfValid = F2(
			function (edge, rep) {
				return (A2($elm_community$intdict$IntDict$member, edge.from, rep) && A2($elm_community$intdict$IntDict$member, edge.to, rep)) ? A2(addEdge, edge, rep) : rep;
			});
		return $elm_community$graph$Graph$Graph(
			A3($elm$core$List$foldl, addEdgeIfValid, nodeRep, edges_));
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm_community$graph$Graph$fromNodeLabelsAndEdgePairs = F2(
	function (labels, edgePairs) {
		var nodes_ = A3(
			$elm$core$List$foldl,
			F2(
				function (lbl, _v1) {
					var id = _v1.a;
					var nodes__ = _v1.b;
					return _Utils_Tuple2(
						id + 1,
						A2(
							$elm$core$List$cons,
							A2($elm_community$graph$Graph$Node, id, lbl),
							nodes__));
				}),
			_Utils_Tuple2(0, _List_Nil),
			labels).b;
		var edges_ = A2(
			$elm$core$List$map,
			function (_v0) {
				var from = _v0.a;
				var to = _v0.b;
				return A3($elm_community$graph$Graph$Edge, from, to, _Utils_Tuple0);
			},
			edgePairs);
		return A2($elm_community$graph$Graph$fromNodesAndEdges, nodes_, edges_);
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Event$Adam = {$: 'Adam'};
var $author$project$Person$Adult = {$: 'Adult'};
var $author$project$Event$Belongs = {$: 'Belongs'};
var $author$project$Event$Event = F5(
	function (world, date, participants, episode, description) {
		return {date: date, description: description, episode: episode, participants: participants, world: world};
	});
var $elm$time$Time$Jun = {$: 'Jun'};
var $author$project$Person$Martha_2 = {$: 'Martha_2'};
var $elm$time$Time$Sep = {$: 'Sep'};
var $author$project$Event$TraveledFromUnknown = {$: 'TraveledFromUnknown'};
var $author$project$Event$changeExistense = function (e) {
	return function (_v0) {
		var p = _v0.a;
		var s = _v0.b;
		return _Utils_Tuple3(p, s, e);
	};
};
var $author$project$Event$Exact = function (a) {
	return {$: 'Exact', a: a};
};
var $author$project$Event$exact = F3(
	function (d, m, y) {
		return $author$project$Event$Exact(
			_Utils_Tuple3(d, m, y));
	});
var $author$project$Person$Gustav = {$: 'Gustav'};
var $author$project$Person$Old = {$: 'Old'};
var $author$project$Timeline$Def$gustav = _Utils_Tuple3($author$project$Person$Gustav, $author$project$Person$Old, $author$project$Event$Belongs);
var $author$project$Event$Eva = {$: 'Eva'};
var $elm$time$Time$Nov = {$: 'Nov'};
var $author$project$Person$Teen = {$: 'Teen'};
var $author$project$Event$TraveledFrom = F3(
	function (a, b, c) {
		return {$: 'TraveledFrom', a: a, b: b, c: c};
	});
var $author$project$Event$Episode = function (a) {
	return {$: 'Episode', a: a};
};
var $author$project$Event$Season = function (a) {
	return {$: 'Season', a: a};
};
var $author$project$Event$sep = F2(
	function (s, e) {
		return _Utils_Tuple2(
			$author$project$Event$Season(s),
			$elm$core$Maybe$Just(
				$author$project$Event$Episode(e)));
	});
var $author$project$Timeline$Def$martha2from2019 = _Utils_Tuple3(
	$author$project$Person$Martha_2,
	$author$project$Person$Teen,
	A3(
		$author$project$Event$TraveledFrom,
		A3($author$project$Event$exact, 4, $elm$time$Time$Nov, 2019),
		$author$project$Event$Eva,
		A2($author$project$Event$sep, 3, 1)));
var $author$project$Event$season = function (s) {
	return _Utils_Tuple2(
		$author$project$Event$Season(s),
		$elm$core$Maybe$Nothing);
};
var $author$project$Person$Jonas = {$: 'Jonas'};
var $author$project$Timeline$Def$strangerJonasFrom2020 = _Utils_Tuple3(
	$author$project$Person$Jonas,
	$author$project$Person$Adult,
	A3(
		$author$project$Event$TraveledFrom,
		A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 2020),
		$author$project$Event$Adam,
		A2($author$project$Event$sep, 2, 8)));
var $author$project$Person$Bartosz = {$: 'Bartosz'};
var $author$project$Person$Franziska = {$: 'Franziska'};
var $author$project$Person$Magnus = {$: 'Magnus'};
var $author$project$Event$addExistense = function (e) {
	return function (_v0) {
		var p = _v0.a;
		var s = _v0.b;
		return _Utils_Tuple3(p, s, e);
	};
};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $author$project$Event$theyAll = A2($elm$core$Basics$composeL, $elm$core$List$map, $author$project$Event$addExistense);
var $author$project$Timeline$Def$travelOfStrangerTeam = A3(
	$author$project$Event$TraveledFrom,
	A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 2020),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 2, 8));
var $author$project$Timeline$Def$strangerTeamFrom2020 = A2(
	$author$project$Event$theyAll,
	$author$project$Timeline$Def$travelOfStrangerTeam,
	_List_fromArray(
		[
			_Utils_Tuple2($author$project$Person$Jonas, $author$project$Person$Adult),
			_Utils_Tuple2($author$project$Person$Magnus, $author$project$Person$Teen),
			_Utils_Tuple2($author$project$Person$Franziska, $author$project$Person$Teen),
			_Utils_Tuple2($author$project$Person$Bartosz, $author$project$Person$Teen)
		]));
var $author$project$Person$Unknown = {$: 'Unknown'};
var $author$project$Timeline$Def$theUnknowns = A2(
	$author$project$Event$theyAll,
	$author$project$Event$TraveledFromUnknown,
	_List_fromArray(
		[
			_Utils_Tuple2($author$project$Person$Unknown, $author$project$Person$Teen),
			_Utils_Tuple2($author$project$Person$Unknown, $author$project$Person$Adult),
			_Utils_Tuple2($author$project$Person$Unknown, $author$project$Person$Old)
		]));
var $author$project$Event$theyAll_ = A2($elm$core$Basics$composeL, $elm$core$List$map, $author$project$Event$changeExistense);
var $author$project$Event$TravelsTo = F3(
	function (a, b, c) {
		return {$: 'TravelsTo', a: a, b: b, c: c};
	});
var $author$project$Timeline$Def$to22Sep2053 = A3(
	$author$project$Event$TravelsTo,
	A3($author$project$Event$exact, 22, $elm$time$Time$Sep, 2053),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 3, 4));
var $author$project$Timeline$Y1888$y1888 = _List_fromArray(
	[
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 1888),
		$author$project$Timeline$Def$strangerTeamFrom2020,
		$author$project$Event$season(3),
		'Stranger-Jonas, and young Bartosz, Franziska, and Magnus arrive from 2020'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 1888),
		_Utils_ap(
			A2($author$project$Event$theyAll_, $author$project$Event$Belongs, $author$project$Timeline$Def$strangerTeamFrom2020),
			_List_fromArray(
				[$author$project$Timeline$Def$gustav])),
		$author$project$Event$season(3),
		'The team of Stranger-Jonas meet Gustav Tannhaus and become new Sic Mundus group'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 21, $elm$time$Time$Sep, 1888),
		_List_fromArray(
			[$author$project$Timeline$Def$martha2from2019]),
		A2($author$project$Event$sep, 3, 1),
		'Martha-2 arrives to the Tannhaus factory'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 21, $elm$time$Time$Sep, 1888),
		_Utils_ap(
			$author$project$Timeline$Def$theUnknowns,
			_List_fromArray(
				[$author$project$Timeline$Def$gustav])),
		A2($author$project$Event$sep, 3, 3),
		'The Unknowns travel to 1988 and kill Gustav Tannhaus'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 21, $elm$time$Time$Sep, 1888),
		_List_fromArray(
			[$author$project$Timeline$Def$martha2from2019, $author$project$Timeline$Def$strangerJonasFrom2020]),
		A2($author$project$Event$sep, 3, 3),
		'Martha-2 gives Stranger-Jonas the God Particle material so he can make a time-travel portal'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 21, $elm$time$Time$Sep, 1888),
		_List_fromArray(
			[
				A2($author$project$Event$changeExistense, $author$project$Timeline$Def$to22Sep2053, $author$project$Timeline$Def$martha2from2019)
			]),
		A2($author$project$Event$sep, 3, 3),
		'Martha-2 uses her own time-travel device to return to 2053'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 22, $elm$time$Time$Sep, 1888),
		_List_fromArray(
			[$author$project$Timeline$Def$strangerJonasFrom2020]),
		A2($author$project$Event$sep, 3, 6),
		'Stranger-Jonas burns the letter from Martha-3'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 22, $elm$time$Time$Sep, 1888),
		_List_fromArray(
			[
				$author$project$Timeline$Def$strangerJonasFrom2020,
				_Utils_Tuple3($author$project$Person$Martha_2, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 3, 6),
		'Adult-Martha-3 travels to 1988 and leaves a new letter on Stranger-Jonas\' desk')
	]);
var $author$project$Person$Silja = {$: 'Silja'};
var $author$project$Event$TraveledFrom_ = function (a) {
	return {$: 'TraveledFrom_', a: a};
};
var $author$project$Event$Throughout = function (a) {
	return {$: 'Throughout', a: a};
};
var $author$project$Event$throughout = $author$project$Event$Throughout;
var $author$project$Timeline$Def$siljaFrom2053 = _Utils_Tuple3(
	$author$project$Person$Silja,
	$author$project$Person$Teen,
	$author$project$Event$TraveledFrom_(
		$author$project$Event$throughout(2053)));
var $author$project$Timeline$Y1890$y1890 = _List_fromArray(
	[
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		$author$project$Event$throughout(1890),
		_List_fromArray(
			[$author$project$Timeline$Def$strangerJonasFrom2020]),
		A2($author$project$Event$sep, 3, 7),
		'Stranger-Jonas continues working on portal'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		$author$project$Event$throughout(1890),
		_List_fromArray(
			[
				$author$project$Timeline$Def$strangerJonasFrom2020,
				$author$project$Timeline$Def$siljaFrom2053,
				_Utils_Tuple3($author$project$Person$Bartosz, $author$project$Person$Adult, $author$project$Timeline$Def$travelOfStrangerTeam)
			]),
		A2($author$project$Event$sep, 3, 7),
		'Bartosz begins to break faith with Jonas and meets Silja when she arrives from 2053')
	]);
var $author$project$Event$Birth = {$: 'Birth'};
var $author$project$Person$Child = {$: 'Child'};
var $author$project$Person$Hanno_Noah = {$: 'Hanno_Noah'};
var $author$project$Event$changeAge = function (s) {
	return function (_v0) {
		var p = _v0.a;
		var e = _v0.c;
		return _Utils_Tuple3(p, s, e);
	};
};
var $author$project$Timeline$Y1904$y1904 = _List_fromArray(
	[
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		$author$project$Event$throughout(1904),
		_List_fromArray(
			[
				A2($author$project$Event$changeAge, $author$project$Person$Adult, $author$project$Timeline$Def$siljaFrom2053),
				_Utils_Tuple3($author$project$Person$Hanno_Noah, $author$project$Person$Child, $author$project$Event$Birth)
			]),
		A2($author$project$Event$sep, 3, 7),
		'Adult-Silja gives birth to a baby boy and names him Hanno (aka Noah)')
	]);
var $author$project$Person$Agnes = {$: 'Agnes'};
var $author$project$Timeline$Y1910$y1910 = _List_fromArray(
	[
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		$author$project$Event$throughout(1910),
		_List_fromArray(
			[
				A2($author$project$Event$changeAge, $author$project$Person$Adult, $author$project$Timeline$Def$siljaFrom2053),
				_Utils_Tuple3($author$project$Person$Agnes, $author$project$Person$Child, $author$project$Event$Birth)
			]),
		A2($author$project$Event$sep, 3, 7),
		'Adult-Silja gives birth to a baby girl and names her Agnes')
	]);
var $author$project$Event$Death = {$: 'Death'};
var $author$project$Person$Hannah = {$: 'Hannah'};
var $author$project$Event$TravelsToUnknown = {$: 'TravelsToUnknown'};
var $author$project$Timeline$Def$adamAtStartOf19xx = _Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Old, $author$project$Timeline$Def$travelOfStrangerTeam);
var $author$project$Timeline$Y1911$y1911 = _List_fromArray(
	[
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		$author$project$Event$throughout(1911),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Hannah, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Silja, $author$project$Person$Teen, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 3, 7),
		'Adult-Hanna arrives from the future with Young Silja'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		$author$project$Event$throughout(1911),
		_List_fromArray(
			[
				$author$project$Timeline$Def$adamAtStartOf19xx,
				_Utils_Tuple3($author$project$Person$Hannah, $author$project$Person$Adult, $author$project$Event$Death)
			]),
		A2($author$project$Event$sep, 3, 7),
		'Stranger-Jonas, who has now become Adam, kills adult-Hannah'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		$author$project$Event$throughout(1911),
		_List_fromArray(
			[
				$author$project$Timeline$Def$adamAtStartOf19xx,
				_Utils_Tuple3($author$project$Person$Silja, $author$project$Person$Child, $author$project$Event$TravelsToUnknown)
			]),
		A2($author$project$Event$sep, 3, 7),
		'Stranger-Jonas, who has now become Adam, sends Silja to the future with the working time portal')
	]);
var $author$project$Event$TraveledFromUnknown_ = function (a) {
	return {$: 'TraveledFromUnknown_', a: a};
};
var $author$project$Timeline$Y1920$y1920 = _List_fromArray(
	[
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		$author$project$Event$throughout(1920),
		_List_fromArray(
			[
				$author$project$Timeline$Def$adamAtStartOf19xx,
				_Utils_Tuple3(
				$author$project$Person$Hanno_Noah,
				$author$project$Person$Adult,
				$author$project$Event$TraveledFromUnknown_(2040))
			]),
		A2($author$project$Event$sep, 3, 7),
		'Adult-Noah arrives from 2040 and starts working for Adam')
	]);
var $author$project$Timeline$Def$from2040 = A3(
	$author$project$Event$TraveledFrom,
	$author$project$Event$throughout(2040),
	$author$project$Event$Eva,
	A2($author$project$Event$sep, 3, 7));
var $author$project$Timeline$Def$from23Jun1954 = A3(
	$author$project$Event$TraveledFrom,
	A3($author$project$Event$exact, 23, $elm$time$Time$Jun, 1954),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 2, 3));
var $author$project$Timeline$Def$to20Jun2019 = A3(
	$author$project$Event$TravelsTo,
	A3($author$project$Event$exact, 20, $elm$time$Time$Jun, 2019),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 2, 6));
var $author$project$Timeline$Def$to27Jun2020 = A3(
	$author$project$Event$TravelsTo,
	A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 2020),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 2, 8));
var $author$project$Timeline$Y1921$y1921 = _List_fromArray(
	[
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 21, $elm$time$Time$Jun, 1921),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Hanno_Noah, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Bartosz, $author$project$Person$Adult, $author$project$Timeline$Def$travelOfStrangerTeam)
			]),
		A2($author$project$Event$sep, 2, 1),
		'Young Noah and Bartosz work to create cave passageway'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 21, $elm$time$Time$Jun, 1921),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Hanno_Noah, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Bartosz, $author$project$Person$Adult, $author$project$Event$Death)
			]),
		A2($author$project$Event$sep, 2, 1),
		'Young Noah kills Bartosz outside the caves'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 21, $elm$time$Time$Jun, 1921),
		_List_Nil,
		A2($author$project$Event$sep, 2, 1),
		'The St. Christopher Church is built over the Sic Mundus headquaters'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 23, $elm$time$Time$Jun, 1921),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Hanno_Noah, $author$project$Person$Adult, $author$project$Timeline$Def$from23Jun1954)
			]),
		A2($author$project$Event$sep, 2, 3),
		'Adult-Noah (another one than the one from 2040?) arrives with a plan to kill Adam'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 24, $elm$time$Time$Jun, 1921),
		_List_fromArray(
			[
				_Utils_Tuple3(
				$author$project$Person$Jonas,
				$author$project$Person$Teen,
				$author$project$Event$TraveledFrom_(
					$author$project$Event$throughout(1953)))
			]),
		A2($author$project$Event$sep, 2, 4),
		'Jonas arrives in 1921 after stepping into the portal in 1953'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 24, $elm$time$Time$Jun, 1921),
		_List_fromArray(
			[
				_Utils_Tuple3(
				$author$project$Person$Jonas,
				$author$project$Person$Teen,
				$author$project$Event$TraveledFrom_(
					$author$project$Event$throughout(1953))),
				$author$project$Timeline$Def$adamAtStartOf19xx,
				_Utils_Tuple3($author$project$Person$Hanno_Noah, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Hanno_Noah, $author$project$Person$Adult, $author$project$Timeline$Def$from2040)
			]),
		A2($author$project$Event$sep, 2, 4),
		'Young-Noah leads Young-Jonas to Adult-Noah who in turn brings him to Adam'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 24, $elm$time$Time$Jun, 1921),
		_List_fromArray(
			[
				_Utils_Tuple3(
				$author$project$Person$Jonas,
				$author$project$Person$Teen,
				$author$project$Event$TraveledFrom_(
					$author$project$Event$throughout(1953))),
				$author$project$Timeline$Def$adamAtStartOf19xx
			]),
		A2($author$project$Event$sep, 2, 4),
		'Adam reveals to Jonas that he is his own future self'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 25, $elm$time$Time$Jun, 1921),
		_List_fromArray(
			[
				_Utils_Tuple3(
				$author$project$Person$Jonas,
				$author$project$Person$Teen,
				$author$project$Event$TraveledFrom_(
					$author$project$Event$throughout(1953))),
				$author$project$Timeline$Def$adamAtStartOf19xx
			]),
		A2($author$project$Event$sep, 2, 5),
		'Adam tells Jonas he has to stop his father, adult-Mikkel, from dying'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 25, $elm$time$Time$Jun, 1921),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Timeline$Def$to20Jun2019)
			]),
		A2($author$project$Event$sep, 2, 5),
		'Jonas enters Adam\'s portal, and goes to 2019'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 1921),
		_List_fromArray(
			[
				$author$project$Timeline$Def$adamAtStartOf19xx,
				_Utils_Tuple3($author$project$Person$Hanno_Noah, $author$project$Person$Adult, $author$project$Event$Death),
				_Utils_Tuple3($author$project$Person$Agnes, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 8),
		'Adult-Noah tries to kill Adam, but the gun won\'t work. Then Agnes shoots and kills Noah'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 1921),
		_List_fromArray(
			[
				A2($author$project$Event$changeExistense, $author$project$Timeline$Def$to27Jun2020, $author$project$Timeline$Def$adamAtStartOf19xx)
			]),
		A2($author$project$Event$sep, 2, 8),
		'Adam travels to 2020 on the day of apocalypse to kill Martha'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 1921),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Hanno_Noah, $author$project$Person$Teen, $author$project$Timeline$Def$to27Jun2020)
			]),
		A2($author$project$Event$sep, 2, 8),
		'Young=Noah travels to 2020 to give Stranger-Jonas the letter from Martha-2, and to meet Young-Elisabeth')
	]);
var $author$project$Person$Bernd = {$: 'Bernd'};
var $author$project$Person$Claudia = {$: 'Claudia'};
var $author$project$Person$Doris = {$: 'Doris'};
var $author$project$Person$Egon = {$: 'Egon'};
var $author$project$Person$Gretchen = {$: 'Gretchen'};
var $author$project$Person$HGTannhaus = {$: 'HGTannhaus'};
var $author$project$Person$Helge = {$: 'Helge'};
var $author$project$Person$Poodle = {$: 'Poodle'};
var $author$project$Person$Ulrich = {$: 'Ulrich'};
var $author$project$Event$Wormhole = {$: 'Wormhole'};
var $author$project$Person$Yasin = {$: 'Yasin'};
var $author$project$Timeline$Def$from8Nov2019 = A3(
	$author$project$Event$TraveledFrom,
	A3($author$project$Event$exact, 8, $elm$time$Time$Nov, 2019),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 1, 8));
var $author$project$Timeline$Def$to12Nov1986 = A3(
	$author$project$Event$TravelsTo,
	A3($author$project$Event$exact, 12, $elm$time$Time$Nov, 1986),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 1, 10));
var $author$project$Timeline$Y1953$y1953 = _List_fromArray(
	[
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		$author$project$Event$throughout(1953),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Old, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 2, 2),
		'Old Claudia buries the suitcase with the time machine in her own future backyard'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 9, $elm$time$Time$Nov, 1953),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Helge, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Yasin, $author$project$Person$Child, $author$project$Event$Death)
			]),
		A2($author$project$Event$sep, 1, 8),
		'Adult-Helge takes Yasin\'s body out of the bunker and drops it at construction site'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 10, $elm$time$Time$Nov, 1953),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Ulrich, $author$project$Person$Adult, $author$project$Timeline$Def$from8Nov2019)
			]),
		A2($author$project$Event$sep, 1, 8),
		'Adult-Ulrich arrives from 2019 after entering the caves'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 10, $elm$time$Time$Nov, 1953),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Egon, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 8),
		'Egon investigates the boy\'s murders'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 10, $elm$time$Time$Nov, 1953),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Egon, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Agnes, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Child, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Doris, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 8),
		'Adult-Agnes and her son Tronte arrive in Winden and start living with Egon, young-Claudia and Doris'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 10, $elm$time$Time$Nov, 1953),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Gretchen, $author$project$Person$Poodle, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 8),
		'Gretchen the poodle gets lost inside the Winden caves'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 10, $elm$time$Time$Nov, 1953),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Bernd, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 8),
		'Bernd picthes the power plant to local investors and the government'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 10, $elm$time$Time$Nov, 1953),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Ulrich, $author$project$Person$Adult, $author$project$Timeline$Def$from8Nov2019),
				_Utils_Tuple3($author$project$Person$HGTannhaus, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 8),
		'Adult-Ulrich visits H.G.Tannhaus'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 10, $elm$time$Time$Nov, 1953),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Ulrich, $author$project$Person$Adult, $author$project$Timeline$Def$from8Nov2019),
				_Utils_Tuple3($author$project$Person$Helge, $author$project$Person$Teen, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 8),
		'Adult-Ulrich attacks young-Helge, scarring his face and ear, and leaves him in the bunker'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 10, $elm$time$Time$Nov, 1953),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Ulrich, $author$project$Person$Adult, $author$project$Timeline$Def$from8Nov2019),
				_Utils_Tuple3($author$project$Person$HGTannhaus, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 8),
		'Tannhaus finds Ulrich\'s cell phone and keeps it'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 10, $elm$time$Time$Nov, 1953),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Ulrich, $author$project$Person$Adult, $author$project$Timeline$Def$from8Nov2019)
			]),
		A2($author$project$Event$sep, 1, 9),
		'Adult Ulrich is arrested and imprisoned'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 11, $elm$time$Time$Nov, 1953),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Old, $author$project$Timeline$Def$from2040),
				_Utils_Tuple3($author$project$Person$HGTannhaus, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 9),
		'Old-Claudia visits Tannhaus and gives him the blueprint for the time machine'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 12, $elm$time$Time$Nov, 1953),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Helge, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Event$Wormhole)
			]),
		A2($author$project$Event$sep, 1, 10),
		'Helge sees the wormhole in the bunker and reaches to touch Jonas'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 12, $elm$time$Time$Nov, 1953),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Helge, $author$project$Person$Teen, $author$project$Timeline$Def$to12Nov1986)
			]),
		A2($author$project$Event$sep, 1, 10),
		'Helge is transported to 1986 inside the bunker, where Adult-Noah finds him')
	]);
var $author$project$Person$Helene = {$: 'Helene'};
var $author$project$Person$Katharina = {$: 'Katharina'};
var $author$project$Person$Obendorf = {$: 'Obendorf'};
var $author$project$Person$Tronte = {$: 'Tronte'};
var $author$project$Timeline$Def$from23Jun1987 = A3(
	$author$project$Event$TraveledFrom,
	A3($author$project$Event$exact, 23, $elm$time$Time$Jun, 1987),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 2, 3));
var $author$project$Timeline$Def$from26Jun2020 = A3(
	$author$project$Event$TraveledFrom,
	A3($author$project$Event$exact, 26, $elm$time$Time$Jun, 2020),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 2, 7));
var $author$project$Timeline$Def$to23Jun1921 = A3(
	$author$project$Event$TravelsTo,
	A3($author$project$Event$exact, 23, $elm$time$Time$Jun, 1921),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 2, 3));
var $author$project$Timeline$Y1954$y1954 = _List_fromArray(
	[
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 23, $elm$time$Time$Jun, 1954),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Helge, $author$project$Person$Child, $author$project$Timeline$Def$from23Jun1987)
			]),
		A2($author$project$Event$sep, 2, 3),
		'Noah uses the time-bunker maching in 1986 to send Helge back home to 1954'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 23, $elm$time$Time$Jun, 1954),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Agnes, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Doris, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 3),
		'Doris and Agnes continue having an affair'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 23, $elm$time$Time$Jun, 1954),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Hanno_Noah, $author$project$Person$Adult, $author$project$Timeline$Def$from23Jun1987)
			]),
		A2($author$project$Event$sep, 2, 3),
		'Adult-Noah arrives back in 1954 after time travelling from 1987'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 23, $elm$time$Time$Jun, 1954),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Hanno_Noah, $author$project$Person$Adult, $author$project$Timeline$Def$from23Jun1987),
				_Utils_Tuple3($author$project$Person$Agnes, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Old, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 2, 3),
		'Agnes tells adult-Noah that old-Claudia has the missing pages from the Trinity notebook'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 23, $elm$time$Time$Jun, 1954),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Egon, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Old, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 2, 3),
		'Old-Claudia visits Egon at the police station and tells him she\'s sorry'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 23, $elm$time$Time$Jun, 1954),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$HGTannhaus, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Old, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 2, 3),
		'Old-Claudia visits Tannhaus and gives him the \'A Jorney Through Time\' book (so he can write it)'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 23, $elm$time$Time$Jun, 1954),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Hanno_Noah, $author$project$Person$Adult, $author$project$Timeline$Def$from23Jun1987),
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Old, $author$project$Event$Death)
			]),
		A2($author$project$Event$sep, 2, 3),
		'Adult-Noah kills Old-Claudia and takes the missing notebook pages'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 23, $elm$time$Time$Jun, 1954),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Hanno_Noah, $author$project$Person$Adult, $author$project$Timeline$Def$to23Jun1921)
			]),
		A2($author$project$Event$sep, 2, 3),
		'Noah realizes that Adam lied and travels back to kill him'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 26, $elm$time$Time$Jun, 1954),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Old, $author$project$Event$Death)
			]),
		A2($author$project$Event$sep, 2, 7),
		'Old-Claudia\'s corpse is examined by a mortician'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 26, $elm$time$Time$Jun, 1954),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Hannah, $author$project$Person$Adult, $author$project$Timeline$Def$from26Jun2020),
				_Utils_Tuple3($author$project$Person$Egon, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Ulrich, $author$project$Person$Adult, $author$project$Timeline$Def$from8Nov2019)
			]),
		A2($author$project$Event$sep, 2, 7),
		'Hannah arrives from 2020 and goes to Egon to ask to see Ulrich'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 26, $elm$time$Time$Jun, 1954),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Hannah, $author$project$Person$Adult, $author$project$Timeline$Def$from26Jun2020),
				_Utils_Tuple3($author$project$Person$Ulrich, $author$project$Person$Adult, $author$project$Timeline$Def$from8Nov2019)
			]),
		A2($author$project$Event$sep, 2, 7),
		'Hannah visits Ulrich, but leaves him imprisoned and denies knowing him'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 26, $elm$time$Time$Jun, 1954),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Hannah, $author$project$Person$Adult, $author$project$Timeline$Def$from26Jun2020),
				_Utils_Tuple3($author$project$Person$Egon, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Katharina, $author$project$Person$Child, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 7),
		'Hannah assumes the identity of \'Katharina Nielsen\' and begins the affair with Egon, chosing to stay in the past'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 26, $elm$time$Time$Jun, 1954),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Agnes, $author$project$Person$Adult, $author$project$Event$TravelsToUnknown),
				_Utils_Tuple3($author$project$Person$Tronte, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Doris, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 7),
		'Agnes time-travels, leaving Tronte and Doris without an explanation'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 24, $elm$time$Time$Sep, 1954),
		_Utils_ap(
			$author$project$Timeline$Def$theUnknowns,
			_List_fromArray(
				[
					_Utils_Tuple3($author$project$Person$Tronte, $author$project$Person$Teen, $author$project$Event$Belongs)
				])),
		A2($author$project$Event$sep, 3, 4),
		'The Unknowns give Tronte the silver snake bracelet'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 24, $elm$time$Time$Sep, 1954),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Hannah, $author$project$Person$Adult, $author$project$Timeline$Def$from26Jun2020),
				_Utils_Tuple3($author$project$Person$Egon, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 3, 4),
		'Egon and Hannah continue their affair and he gives her the St.Christopher necklace'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 24, $elm$time$Time$Sep, 1954),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Hannah, $author$project$Person$Adult, $author$project$Timeline$Def$from26Jun2020),
				_Utils_Tuple3($author$project$Person$Egon, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 3, 4),
		'Hannah learns she\'s pregnant with Egon\'s baby'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 24, $elm$time$Time$Sep, 1954),
		_Utils_ap(
			$author$project$Timeline$Def$theUnknowns,
			_List_fromArray(
				[
					_Utils_Tuple3($author$project$Person$Bernd, $author$project$Person$Adult, $author$project$Event$Belongs)
				])),
		A2($author$project$Event$sep, 3, 4),
		'The Unknowns coerce a goverment official into giving Bernd the building permits for the nuclear power plant'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 24, $elm$time$Time$Sep, 1954),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Hannah, $author$project$Person$Adult, $author$project$Timeline$Def$from26Jun2020),
				_Utils_Tuple3($author$project$Person$Obendorf, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Helene, $author$project$Person$Teen, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 3, 4),
		'Hannah goes to Fran Obendorf\'s for an abortion and meets young Helene Albers'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 24, $elm$time$Time$Sep, 1954),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Hannah, $author$project$Person$Adult, $author$project$Timeline$Def$from26Jun2020),
				_Utils_Tuple3($author$project$Person$Katharina, $author$project$Person$Child, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Helene, $author$project$Person$Teen, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 3, 4),
		'Hannah gives Helene Albers the idea for the name Katharina and leaves her the St.Christopher necklace'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 24, $elm$time$Time$Sep, 1954),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Hannah, $author$project$Person$Adult, $author$project$Timeline$Def$from26Jun2020),
				_Utils_Tuple3($author$project$Person$Silja, $author$project$Person$Child, $author$project$Event$Birth)
			]),
		A2($author$project$Event$sep, 3, 4),
		'Hannah decides to keep her baby and starts new life with her future daughter, Silja')
	]);
var $elm$time$Time$Aug = {$: 'Aug'};
var $author$project$Person$Charlotte = {$: 'Charlotte'};
var $author$project$Person$Marek = {$: 'Marek'};
var $author$project$Event$Origin_1 = {$: 'Origin_1'};
var $author$project$Event$Origin_2 = {$: 'Origin_2'};
var $author$project$Person$Sonja = {$: 'Sonja'};
var $author$project$Timeline$Y1971$y1971 = _List_fromArray(
	[
		A5(
		$author$project$Event$Event,
		$author$project$Event$Origin_1,
		A3($author$project$Event$exact, 8, $elm$time$Time$Aug, 1971),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Marek, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Sonja, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Charlotte, $author$project$Person$Child, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$HGTannhaus, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 3, 7),
		'In one reality, Marek, Sonja and baby Charlotte have an argue with Tannhaus'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Origin_1,
		A3($author$project$Event$exact, 8, $elm$time$Time$Aug, 1971),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Marek, $author$project$Person$Adult, $author$project$Event$Death),
				_Utils_Tuple3($author$project$Person$Sonja, $author$project$Person$Adult, $author$project$Event$Death),
				_Utils_Tuple3($author$project$Person$Charlotte, $author$project$Person$Child, $author$project$Event$Death)
			]),
		A2($author$project$Event$sep, 3, 7),
		'In one reality, Marek, Sonja and baby Charlotte die in a car accident'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Origin_2,
		A3($author$project$Event$exact, 8, $elm$time$Time$Aug, 1971),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Event$Wormhole),
				_Utils_Tuple3($author$project$Person$Martha_2, $author$project$Person$Teen, $author$project$Event$Wormhole),
				_Utils_Tuple3($author$project$Person$Marek, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Sonja, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Charlotte, $author$project$Person$Child, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$HGTannhaus, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 3, 8),
		'In new reality, Jonas and Martha-2 convince Marek to drive back to the clock shop, saving their lives'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Origin_2,
		A3($author$project$Event$exact, 8, $elm$time$Time$Aug, 1971),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Event$Death),
				_Utils_Tuple3($author$project$Person$Martha_2, $author$project$Person$Teen, $author$project$Event$Death)
			]),
		A2($author$project$Event$sep, 3, 8),
		'Jonas and Martha-2 both die/disappear following the conversation')
	]);
var $author$project$Timeline$Y1974$y1974 = _List_fromArray(
	[
		A5(
		$author$project$Event$Event,
		$author$project$Event$Origin_1,
		$author$project$Event$throughout(1974),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$HGTannhaus, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 3, 7),
		'In first reality, H.G.Tannhaus begins building Time Machine to try to resurrect his family')
	]);
var $author$project$Person$Boris_Aleksander = {$: 'Boris_Aleksander'};
var $author$project$Person$Ines = {$: 'Ines'};
var $author$project$Person$Mikkel = {$: 'Mikkel'};
var $author$project$Person$Regina = {$: 'Regina'};
var $author$project$Timeline$Def$from12Nov2019 = A3(
	$author$project$Event$TraveledFrom,
	A3($author$project$Event$exact, 12, $elm$time$Time$Nov, 2019),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 1, 10));
var $author$project$Timeline$Def$from4Nov2019 = A3(
	$author$project$Event$TraveledFrom,
	A3($author$project$Event$exact, 4, $elm$time$Time$Nov, 2019),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 1, 1));
var $author$project$Timeline$Def$from8Nov2019_ = A3(
	$author$project$Event$TraveledFrom,
	A3($author$project$Event$exact, 8, $elm$time$Time$Nov, 2019),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 1, 6));
var $author$project$Timeline$Def$to12Nov2052 = A3(
	$author$project$Event$TravelsTo,
	A3($author$project$Event$exact, 12, $elm$time$Time$Nov, 2052),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 1, 10));
var $author$project$Timeline$Y1986$y1986 = _List_fromArray(
	[
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 21, $elm$time$Time$Jun, 1986),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Unknown, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 3, 6),
		'The adult-Unknown sets off the nuclear accident by altering the volume control system, creating the radioactive material that will become God Particle'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Eva,
		A3($author$project$Event$exact, 21, $elm$time$Time$Jun, 1986),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Unknown, $author$project$Person$Old, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Unknown, $author$project$Person$Teen, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 3, 6),
		'The young- and old-Unknown sets off the nuclear accident by altering the volume control system, creating the radioactive material that will become God Particle'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Origin_1,
		A3($author$project$Event$exact, 21, $elm$time$Time$Jun, 1986),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$HGTannhaus, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 3, 7),
		'In first reality, Tannhaus completes time machine and creates Martha and Jonas\' separate worlds'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 5, $elm$time$Time$Nov, 1986),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Mikkel, $author$project$Person$Child, $author$project$Timeline$Def$from4Nov2019)
			]),
		A2($author$project$Event$sep, 1, 2),
		'Mikkel comes out of the caves and realizes he\'s in the past'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 5, $elm$time$Time$Nov, 1986),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Mikkel, $author$project$Person$Child, $author$project$Timeline$Def$from4Nov2019),
				_Utils_Tuple3($author$project$Person$Ines, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 3),
		'Ines starts to look after Mikkel'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 5, $elm$time$Time$Nov, 1986),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Helge, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 3),
		'Adult-Helge gives Claudia with \'Journey Through Time\' book'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 5, $elm$time$Time$Nov, 1986),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Bernd, $author$project$Person$Old, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 3),
		'Old-Bernd tells Claudia about nuclear power plant accident that created God Particle material, shows her barrels hidden in caves'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 5, $elm$time$Time$Nov, 1986),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Hanno_Noah, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Mikkel, $author$project$Person$Child, $author$project$Timeline$Def$from4Nov2019)
			]),
		A2($author$project$Event$sep, 1, 5),
		'Adult-Noah visits Mikkel in the hospital'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 5, $elm$time$Time$Nov, 1986),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Hannah, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Mikkel, $author$project$Person$Child, $author$project$Timeline$Def$from4Nov2019)
			]),
		A2($author$project$Event$sep, 1, 5),
		'Young Hannah meets Mikkel'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 8, $elm$time$Time$Nov, 1986),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Timeline$Def$from8Nov2019_)
			]),
		A2($author$project$Event$sep, 1, 6),
		'Jonas comes out from the caves and finds himself in the past'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 9, $elm$time$Time$Nov, 1986),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Timeline$Def$from8Nov2019_),
				_Utils_Tuple3($author$project$Person$Mikkel, $author$project$Person$Child, $author$project$Timeline$Def$from4Nov2019),
				_Utils_Tuple3($author$project$Person$Hannah, $author$project$Person$Teen, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 7),
		'Jonas finds Mikkel at the hospital and sees him with young-Hannah'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 9, $elm$time$Time$Nov, 1986),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Timeline$Def$from8Nov2019_),
				_Utils_Tuple3($author$project$Person$Mikkel, $author$project$Person$Child, $author$project$Timeline$Def$from4Nov2019),
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 1, 7),
		'Stranger-Jonas stops Jonas from bringing Mikkel back to 2019'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 9, $elm$time$Time$Nov, 1986),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$HGTannhaus, $author$project$Person$Old, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 8),
		'Stranger-Jonas visits Tannhaus and shows him the broken time travel machine'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 9, $elm$time$Time$Nov, 1986),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$HGTannhaus, $author$project$Person$Old, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Old, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 1, 8),
		'Tannhaus reveals a brand-new time travel machine he built based on Claudia\'s blueprints'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 9, $elm$time$Time$Nov, 1986),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Helge, $author$project$Person$Old, $author$project$Timeline$Def$from8Nov2019),
				_Utils_Tuple3($author$project$Person$Helge, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 9),
		'Old-helge arrives from 2019 and follows his adult-self'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 9, $elm$time$Time$Nov, 1986),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Boris_Aleksander, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Regina, $author$project$Person$Teen, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 9),
		'Boris Niewald arrives in Winden and meets Young-Regina'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 9, $elm$time$Time$Nov, 1986),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Boris_Aleksander, $author$project$Person$Teen, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 9),
		'Boris adopts the false identity of Aleksander Kohler (by killing him?)'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 9, $elm$time$Time$Nov, 1986),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Hanno_Noah, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Helge, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 9),
		'Adult-Noah and adult-Helge work in the bunker on the time machine'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 9, $elm$time$Time$Nov, 1986),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Boris_Aleksander, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 9),
		'Aleksander begins working with Claudia at the power plant'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 12, $elm$time$Time$Nov, 1986),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$HGTannhaus, $author$project$Person$Old, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Ulrich, $author$project$Person$Adult, $author$project$Timeline$Def$from8Nov2019)
			]),
		A2($author$project$Event$sep, 1, 10),
		'Tannhaus gives Stranger-Jonas the brand-new time machine and shows him how Ulrich\'s cell phone helps it work'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 12, $elm$time$Time$Nov, 1986),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Timeline$Def$from12Nov2019)
			]),
		A2($author$project$Event$sep, 1, 10),
		'Jonas arrives from 2019 again'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 12, $elm$time$Time$Nov, 1986),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Timeline$Def$from12Nov2019),
				_Utils_Tuple3($author$project$Person$Hanno_Noah, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Helge, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 10),
		'Adult-Helge and adult-Noah kidnap Jonas and bring him to the bunker'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 12, $elm$time$Time$Nov, 1986),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Helge, $author$project$Person$Old, $author$project$Timeline$Def$from8Nov2019),
				_Utils_Tuple3($author$project$Person$Helge, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 10),
		'Old-Helge crashes his car into his adult-Helge\'s car. The old-Helge dies but adult-Helge survives and is permanently hospotalized'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 12, $elm$time$Time$Nov, 1986),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Adult, $author$project$Event$Wormhole)
			]),
		A2($author$project$Event$sep, 1, 10),
		'Stranger-Jonas opens the wormhole using the time machine in the cave passage'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 12, $elm$time$Time$Nov, 1986),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Timeline$Def$from12Nov2019),
				_Utils_Tuple3($author$project$Person$Helge, $author$project$Person$Teen, $author$project$Event$Wormhole)
			]),
		A2($author$project$Event$sep, 1, 10),
		'Jonas sees the wormhole open inside the bunker and reaches through to touch Helge'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 12, $elm$time$Time$Nov, 1986),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Timeline$Def$to12Nov2052)
			]),
		A2($author$project$Event$sep, 1, 10),
		'Jonas is transported to 2052')
	]);
var $author$project$Person$Mads = {$: 'Mads'};
var $author$project$Event$Missing = {$: 'Missing'};
var $author$project$Event$TravelsToUnknown_ = function (a) {
	return {$: 'TravelsToUnknown_', a: a};
};
var $author$project$Timeline$Def$from27Jun2020 = A3(
	$author$project$Event$TraveledFrom,
	A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 2020),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 2, 8));
var $author$project$Timeline$Def$to12Nov1953 = A3(
	$author$project$Event$TravelsTo,
	A3($author$project$Event$exact, 12, $elm$time$Time$Nov, 1953),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 2, 3));
var $author$project$Timeline$Y1987$y1987 = _List_fromArray(
	[
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 22, $elm$time$Time$Jun, 1987),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Old, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 2, 2),
		'Old-Claudia visits Claudia in the office and tells her about time travel'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 22, $elm$time$Time$Jun, 1987),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Egon, $author$project$Person$Old, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Mads, $author$project$Person$Teen, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 2),
		'Old-Egon is diagnosed with cancer and decides to reivestigate Mads\' disappearance'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 22, $elm$time$Time$Jun, 1987),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Egon, $author$project$Person$Old, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Ulrich, $author$project$Person$Old, $author$project$Timeline$Def$from8Nov2019)
			]),
		A2($author$project$Event$sep, 2, 2),
		'Old-Egon visits Ulrich, who is now an old man, in the psychatric hospital'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 22, $elm$time$Time$Jun, 1987),
		_List_fromArray(
			[
				_Utils_Tuple3(
				$author$project$Person$Hannah,
				$author$project$Person$Adult,
				$author$project$Event$TraveledFromUnknown_(2019)),
				_Utils_Tuple3(
				$author$project$Person$Jonas,
				$author$project$Person$Adult,
				$author$project$Event$TraveledFromUnknown_(2018)),
				_Utils_Tuple3($author$project$Person$Mikkel, $author$project$Person$Child, $author$project$Timeline$Def$from4Nov2019)
			]),
		A2($author$project$Event$sep, 2, 2),
		'Adult-Hanna and Stranger-Jonas arrive from 2019 and Hanna relizes her husband was Mikkel'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 22, $elm$time$Time$Jun, 1987),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 2),
		'Claudia digs up the time machine in her backyard'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 23, $elm$time$Time$Jun, 1987),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Hanno_Noah, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Helge, $author$project$Person$Teen, $author$project$Timeline$Def$to12Nov1953)
			]),
		A2($author$project$Event$sep, 2, 3),
		'Adult-Noah sends young-Helge back to 1953 using the time machine in the bunker'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 23, $elm$time$Time$Jun, 1987),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Hanno_Noah, $author$project$Person$Adult, $author$project$Timeline$Def$to12Nov1953)
			]),
		A2($author$project$Event$sep, 2, 3),
		'Adult-Noah also travels back to 1953'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 23, $elm$time$Time$Jun, 1987),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$HGTannhaus, $author$project$Person$Old, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 3),
		'Claudia visits old-Tannhaus and he further explains how the time machine works'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 25, $elm$time$Time$Jun, 1987),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Ulrich, $author$project$Person$Old, $author$project$Timeline$Def$from8Nov2019),
				_Utils_Tuple3($author$project$Person$Mikkel, $author$project$Person$Child, $author$project$Timeline$Def$from4Nov2019),
				_Utils_Tuple3($author$project$Person$Ines, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 5),
		'Old-Ulrich escapes from psychiatric hospital and finds Mikkel at Ines\' house'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 25, $elm$time$Time$Jun, 1987),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Ulrich, $author$project$Person$Old, $author$project$Timeline$Def$from8Nov2019),
				_Utils_Tuple3($author$project$Person$Mikkel, $author$project$Person$Child, $author$project$Timeline$Def$from4Nov2019)
			]),
		A2($author$project$Event$sep, 2, 5),
		'Mikkel recognizes his father in old-Ulrich and they try to escape through caves but get caught'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 25, $elm$time$Time$Jun, 1987),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Ulrich, $author$project$Person$Old, $author$project$Timeline$Def$from8Nov2019),
				_Utils_Tuple3($author$project$Person$Mikkel, $author$project$Person$Child, $author$project$Timeline$Def$from4Nov2019),
				_Utils_Tuple3($author$project$Person$Ines, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 5),
		'Mikkel returns to Ines\' home, Ulrich is imprisoned once again'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 26, $elm$time$Time$Jun, 1987),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Egon, $author$project$Person$Old, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 7),
		'Old-Egon tells Claudia that he thinks time travel is real, and he realizes that she already knows'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 26, $elm$time$Time$Jun, 1987),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Egon, $author$project$Person$Old, $author$project$Event$Death)
			]),
		A2($author$project$Event$sep, 2, 7),
		'Claudia fights with Egon and she accidentally kills him'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 26, $elm$time$Time$Jun, 1987),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3(
				$author$project$Person$Jonas,
				$author$project$Person$Teen,
				$author$project$Event$TraveledFromUnknown_(2019))
			]),
		A2($author$project$Event$sep, 2, 7),
		'Jonas arrives from 2019 and meets Claudia for the first time (on old-Claudia\'s orders)'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 26, $elm$time$Time$Jun, 1987),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Adult, $author$project$Event$TravelsToUnknown),
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Event$TravelsToUnknown)
			]),
		A2($author$project$Event$sep, 2, 7),
		'Jonas tells Claudia there\'s a way to change everything and brings Claudia with him to the future'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 1987),
		_List_fromArray(
			[
				_Utils_Tuple3(
				$author$project$Person$Claudia,
				$author$project$Person$Adult,
				$author$project$Event$TravelsToUnknown_(2020)),
				_Utils_Tuple3(
				$author$project$Person$Jonas,
				$author$project$Person$Teen,
				$author$project$Event$TravelsToUnknown_(2020))
			]),
		A2($author$project$Event$sep, 2, 8),
		'Jonas and Claudia reopen the passageway in the caves and then travel to 2020'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 1987),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Katharina, $author$project$Person$Adult, $author$project$Timeline$Def$from27Jun2020),
				_Utils_Tuple3($author$project$Person$Mikkel, $author$project$Person$Child, $author$project$Timeline$Def$from4Nov2019)
			]),
		A2($author$project$Event$sep, 2, 8),
		'Katharina arrives from 2020 using the caves, planning to find Mikkel'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 21, $elm$time$Time$Sep, 1987),
		_Utils_ap(
			$author$project$Timeline$Def$theUnknowns,
			_List_fromArray(
				[
					_Utils_Tuple3($author$project$Person$Bernd, $author$project$Person$Old, $author$project$Event$Death)
				])),
		A2($author$project$Event$sep, 3, 1),
		'The Unknowns kill Bernd and steal the master keys for the power plant'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 22, $elm$time$Time$Sep, 1987),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Katharina, $author$project$Person$Adult, $author$project$Timeline$Def$from27Jun2020),
				_Utils_Tuple3($author$project$Person$Mikkel, $author$project$Person$Child, $author$project$Timeline$Def$from4Nov2019)
			]),
		A2($author$project$Event$sep, 3, 2),
		'Katharina continues her search for Mikkel'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 22, $elm$time$Time$Sep, 1987),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Adult, $author$project$Event$Missing)
			]),
		A2($author$project$Event$sep, 3, 2),
		'Claudia is considered \'missing\' after she disappeared following Egon\'s death'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 22, $elm$time$Time$Sep, 1987),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Katharina, $author$project$Person$Adult, $author$project$Timeline$Def$from27Jun2020),
				_Utils_Tuple3($author$project$Person$Helene, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 3, 2),
		'Katharina goes to the psychiatric hospital and sees mother Helene at the reception desk'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 22, $elm$time$Time$Sep, 1987),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Katharina, $author$project$Person$Adult, $author$project$Timeline$Def$from27Jun2020),
				_Utils_Tuple3($author$project$Person$Ulrich, $author$project$Person$Old, $author$project$Timeline$Def$from8Nov2019)
			]),
		A2($author$project$Event$sep, 3, 2),
		'Katharina meets old-Ulrich and vows to get him back to 2020'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 22, $elm$time$Time$Sep, 1987),
		$author$project$Timeline$Def$theUnknowns,
		A2($author$project$Event$sep, 3, 2),
		'The Unknowns go to the power-plant and steal the schematics for the volume control after killing Claudia\'s assistant'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 23, $elm$time$Time$Sep, 1987),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Katharina, $author$project$Person$Adult, $author$project$Timeline$Def$from27Jun2020),
				_Utils_Tuple3($author$project$Person$Ulrich, $author$project$Person$Old, $author$project$Timeline$Def$from8Nov2019)
			]),
		A2($author$project$Event$sep, 3, 5),
		'Katharina tells old-Ulrich to meet her that night in the hospital so he can escape'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 23, $elm$time$Time$Sep, 1987),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Katharina, $author$project$Person$Adult, $author$project$Event$Death),
				_Utils_Tuple3($author$project$Person$Helene, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 3, 5),
		'Katharina tries to steal a keycard from Helene, but Helene kills Katharina and drags her body into the lake'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 23, $elm$time$Time$Sep, 1987),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Helene, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 3, 5),
		'Helene\'s St.Cristopher necklase is left in the sand on the lakeshore')
	]);
var $author$project$Person$Benni = {$: 'Benni'};
var $author$project$Event$Join = F2(
	function (a, b) {
		return {$: 'Join', a: a, b: b};
	});
var $author$project$Person$Martha = {$: 'Martha'};
var $author$project$Person$Martha_3 = {$: 'Martha_3'};
var $author$project$Person$Peter = {$: 'Peter'};
var $author$project$Person$Torben = {$: 'Torben'};
var $author$project$Timeline$Def$from6Nov2052 = A3(
	$author$project$Event$TravelsTo,
	A3($author$project$Event$exact, 6, $elm$time$Time$Nov, 2052),
	$author$project$Event$Eva,
	A2($author$project$Event$sep, 3, 3));
var $author$project$Timeline$Def$from8Nov1986 = A3(
	$author$project$Event$TraveledFrom,
	A3($author$project$Event$exact, 8, $elm$time$Time$Nov, 1986),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 1, 6));
var $author$project$Timeline$Def$to21Sep1888 = A3(
	$author$project$Event$TravelsTo,
	A3($author$project$Event$exact, 21, $elm$time$Time$Sep, 1888),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 3, 3));
var $author$project$Timeline$Def$to5Nov1986 = A3(
	$author$project$Event$TravelsTo,
	A3($author$project$Event$exact, 5, $elm$time$Time$Nov, 1986),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 1, 1));
var $author$project$Timeline$Def$to5Nov2052 = A3(
	$author$project$Event$TravelsTo,
	A3($author$project$Event$exact, 5, $elm$time$Time$Nov, 2052),
	$author$project$Event$Eva,
	A2($author$project$Event$sep, 3, 3));
var $author$project$Timeline$Def$to6Nov2052 = A3(
	$author$project$Event$TravelsTo,
	A3($author$project$Event$exact, 6, $elm$time$Time$Nov, 2052),
	$author$project$Event$Eva,
	A2($author$project$Event$sep, 3, 5));
var $author$project$Timeline$Def$to8Nov1953 = A3(
	$author$project$Event$TravelsTo,
	A3($author$project$Event$exact, 8, $elm$time$Time$Nov, 1953),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 1, 8));
var $author$project$Timeline$Def$to8Nov1986 = A3(
	$author$project$Event$TravelsTo,
	A3($author$project$Event$exact, 8, $elm$time$Time$Nov, 1986),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 1, 6));
var $author$project$Timeline$Y2019$y2019 = _List_fromArray(
	[
		A5(
		$author$project$Event$Event,
		$author$project$Event$Origin_2,
		$author$project$Event$throughout(2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Regina, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Peter, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Benni, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Hannah, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Torben, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Katharina, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 3, 8),
		'Regina, Peter, Benni, Hannah, Torben, and Katharina have dinner party'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 20, $elm$time$Time$Jun, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Bartosz, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Martha, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Magnus, $author$project$Person$Teen, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 6),
		'Jonas goes to the lake with Martha, Magnus, and Bartosz'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 20, $elm$time$Time$Jun, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Helene, $author$project$Person$Adult, $author$project$Event$Death)
			]),
		A2($author$project$Event$sep, 2, 6),
		'Jonas finds Helene\'s St.Christopher necklace in the sand by the lake'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 20, $elm$time$Time$Jun, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3(
				$author$project$Person$Jonas,
				$author$project$Person$Teen,
				$author$project$Event$TraveledFrom_(
					$author$project$Event$throughout(1921))),
				_Utils_Tuple3($author$project$Person$Mikkel, $author$project$Person$Adult, $author$project$Timeline$Def$from4Nov2019)
			]),
		A2($author$project$Event$sep, 2, 6),
		'A slightly-older Jonas arrives from 1921 on mission to stop adult-Mikkel from dying by suicide'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 20, $elm$time$Time$Jun, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3(
				$author$project$Person$Jonas,
				$author$project$Person$Teen,
				$author$project$Event$TraveledFrom_(
					$author$project$Event$throughout(1921))),
				_Utils_Tuple3($author$project$Person$Martha, $author$project$Person$Teen, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 6),
		'A slightly-older Jonas goes to the lake, also kisses Martha, and then leaves'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 20, $elm$time$Time$Jun, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Martha, $author$project$Person$Teen, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 6),
		'Martha puts St. Christopher pendant onto a cord and gives it to Jonas'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 20, $elm$time$Time$Jun, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Martha, $author$project$Person$Teen, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 6),
		'Martha and Jonas have sex for the first time'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 20, $elm$time$Time$Jun, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Ulrich, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Katharina, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Hannah, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 6),
		'Ulrich cheats on Katharina with Hannah in the backyard during their anniversary party'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 20, $elm$time$Time$Jun, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3(
				$author$project$Person$Jonas,
				$author$project$Person$Teen,
				$author$project$Event$TraveledFrom_(
					$author$project$Event$throughout(1921))),
				_Utils_Tuple3($author$project$Person$Mikkel, $author$project$Person$Adult, $author$project$Timeline$Def$from4Nov2019)
			]),
		A2($author$project$Event$sep, 2, 6),
		'Time-travelling Jonas goes to Mikkel and asks him not to kill himself'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 20, $elm$time$Time$Jun, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3(
				$author$project$Person$Jonas,
				$author$project$Person$Teen,
				$author$project$Event$TraveledFrom_(
					$author$project$Event$throughout(1921))),
				_Utils_Tuple3($author$project$Person$Mikkel, $author$project$Person$Adult, $author$project$Timeline$Def$from4Nov2019)
			]),
		A2($author$project$Event$sep, 2, 6),
		'But Jonas\' appearance turns out to be the reason why Mikkel decides to die'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 20, $elm$time$Time$Jun, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3(
				$author$project$Person$Jonas,
				$author$project$Person$Teen,
				$author$project$Event$TraveledFrom_(
					$author$project$Event$throughout(1921))),
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Old, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 6),
		'Jonas begins working with old-Claudia, devastated by Adam\'s lie to him about saving Mikkel'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 21, $elm$time$Time$Jun, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Mikkel, $author$project$Person$Adult, $author$project$Event$Death)
			]),
		A2($author$project$Event$sep, 2, 6),
		'Adult-Mikkel dies by suicide'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Eva,
		A3($author$project$Event$exact, 4, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Timeline$Def$from6Nov2052),
				_Utils_Tuple3($author$project$Person$Martha_2, $author$project$Person$Teen, $author$project$Timeline$Def$from6Nov2052)
			]),
		A2($author$project$Event$sep, 3, 2),
		'World One (Adam) Jonas is brought to World Two (Eva) by Martha-2'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Eva,
		A3($author$project$Event$exact, 4, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Martha_2, $author$project$Person$Teen, $author$project$Timeline$Def$to21Sep1888)
			]),
		A2($author$project$Event$sep, 3, 2),
		'Martha-2 travels to 1988 in World one to give Stranger-Jonas the God particle material needed for his portal'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Eva,
		A3($author$project$Event$exact, 4, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Martha_3, $author$project$Person$Old, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 3, 1),
		'Martha-3, aka Eva, brings Jonas to the Erit Lux headquaters'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Eva,
		A3($author$project$Event$exact, 4, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Martha_3, $author$project$Person$Old, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Martha_2, $author$project$Person$Teen, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 3, 3),
		'Martha-3, aka Eva, convinces Jonas to help her and Martha-2 work against Adam'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 4, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Peter, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Mads, $author$project$Person$Child, $author$project$Event$Wormhole)
			]),
		A2($author$project$Event$sep, 1, 10),
		'Peter is in the bunker when Mads\' body drops through wormhole and into 2019'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 4, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Peter, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Tronte, $author$project$Person$Old, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Mads, $author$project$Person$Child, $author$project$Event$Wormhole)
			]),
		A2($author$project$Event$sep, 1, 10),
		'Peter calls Tronte, Mads\' father, who comes to the bunker'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 4, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Old, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Tronte, $author$project$Person$Old, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Peter, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 10),
		'Old-Claudia arrives and explains time travel to Peter and Tronte'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 4, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Mikkel, $author$project$Person$Child, $author$project$Timeline$Def$to5Nov1986),
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 1),
		'Mikkel is brought through the cave passageway (by Jonas) to 1986'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 4, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Peter, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Tronte, $author$project$Person$Old, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Mads, $author$project$Person$Child, $author$project$Event$Death)
			]),
		A2($author$project$Event$sep, 1, 1),
		'Peter and Tronte take Mads\' body to the forest'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Eva,
		A3($author$project$Event$exact, 5, $elm$time$Time$Nov, 2019),
		_Utils_ap(
			$author$project$Timeline$Def$theUnknowns,
			_List_fromArray(
				[
					_Utils_Tuple3($author$project$Person$Martha_3, $author$project$Person$Old, $author$project$Event$TraveledFromUnknown)
				])),
		A2($author$project$Event$sep, 3, 3),
		'the Unknowns return to Eva with the keys, watch and power plant schematics'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Eva,
		A3($author$project$Event$exact, 5, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Timeline$Def$to5Nov2052),
				_Utils_Tuple3($author$project$Person$Martha_2, $author$project$Person$Teen, $author$project$Timeline$Def$to5Nov2052)
			]),
		A2($author$project$Event$sep, 3, 3),
		'Jonas and Martha-2 travel through the cave passage-way and into 2052'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 5, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[$author$project$Timeline$Def$strangerJonasFrom2020]),
		A2($author$project$Event$sep, 1, 2),
		'Stranger-Jonas comes to Winden and goes to the Waldhotel'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 5, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Boris_Aleksander, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 2),
		'Aleksander has barrels of the radioactive material loaded into an off-site truck'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Eva,
		A3($author$project$Event$exact, 6, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Martha_2, $author$project$Person$Teen, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 3, 5),
		'Jonas and Martha-2 head to the power plant and she cuts her cheek'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Eva,
		A3($author$project$Event$exact, 6, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Event$TravelsToUnknown),
				_Utils_Tuple3($author$project$Person$Martha_2, $author$project$Person$Teen, $author$project$Event$TravelsToUnknown)
			]),
		A2($author$project$Event$sep, 3, 5),
		'Jonas sees the Martha-2 cut and instead brings Martha-2 to Eva'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Eva,
		A3($author$project$Event$exact, 6, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Martha_3, $author$project$Person$Old, $author$project$Timeline$Def$to6Nov2052),
				_Utils_Tuple3($author$project$Person$Martha_3, $author$project$Person$Teen, $author$project$Timeline$Def$to6Nov2052),
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Event$Death)
			]),
		A2($author$project$Event$sep, 3, 5),
		'Eva has Martha-3 shoot and kill Jonas and then they travel to 2052'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Eva,
		A3($author$project$Event$exact, 7, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3(
				$author$project$Person$Martha_2,
				$author$project$Person$Teen,
				$author$project$Event$TravelsToUnknown_(2053)),
				_Utils_Tuple3(
				$author$project$Person$Magnus,
				$author$project$Person$Adult,
				$author$project$Event$TravelsToUnknown_(2053)),
				_Utils_Tuple3(
				$author$project$Person$Franziska,
				$author$project$Person$Adult,
				$author$project$Event$TravelsToUnknown_(2053))
			]),
		A2($author$project$Event$sep, 3, 6),
		'Martha-2 tries to prevent the Apocalypse but is intercepted by adult-Magnus and adult Franziska and brought to Adam in 2053 (World one)'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Eva,
		A3($author$project$Event$exact, 7, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Bartosz, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Bartosz, $author$project$Person$Teen, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 3, 6),
		'Adult-Bartosz from World Two intercepts young-Bartosz from World Two, bringing him to work with Eva'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Eva,
		A3($author$project$Event$exact, 7, $elm$time$Time$Nov, 2019),
		_List_Nil,
		A2($author$project$Event$sep, 3, 6),
		'The Apocalypse happens in World Two'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 7, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3(
				$author$project$Person$Yasin,
				$author$project$Person$Child,
				$author$project$Event$TravelsToUnknown_(1986)),
				_Utils_Tuple3($author$project$Person$Helge, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 4),
		'Yasin is kidnapped by Helge and taken to the bunker in 1986'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 7, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Hanno_Noah, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Bartosz, $author$project$Person$Teen, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 5),
		'Adult-Noah makes contact with young-Bartosz for the first time'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 8, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3(
				$author$project$Person$Jonas,
				$author$project$Person$Teen,
				A2($author$project$Event$Join, $author$project$Timeline$Def$to8Nov1986, $author$project$Timeline$Def$from8Nov1986))
			]),
		A2($author$project$Event$sep, 1, 6),
		'Jonas finds the passageway in the caves for the first time and then travels to 1986 and then back'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 8, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Ulrich, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Mads, $author$project$Person$Child, $author$project$Event$Death)
			]),
		A2($author$project$Event$sep, 1, 7),
		'Ulrich realizes the body from the forest was Mads'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 8, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Charlotte, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 7),
		'Charlotte continues the investigation and searches the power plant and bunker'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 8, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Ulrich, $author$project$Person$Adult, $author$project$Timeline$Def$to8Nov1953),
				_Utils_Tuple3($author$project$Person$Helge, $author$project$Person$Child, $author$project$Timeline$Def$to8Nov1953)
			]),
		A2($author$project$Event$sep, 1, 8),
		'Ulrich follows Helge to travel to 1953'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 11, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Old, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Bartosz, $author$project$Person$Teen, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 9),
		'Old Claudia visits young-Bartosz for the first time'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 11, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Martha, $author$project$Person$Teen, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 9),
		'Jonas tries to end things with Martha after learning she\'s his aunt'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 11, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Boris_Aleksander, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 9),
		'Strabger-Jonas takes some of the radioactive material from the truck Aleksander had hidden'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 12, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3(
				$author$project$Person$Jonas,
				$author$project$Person$Teen,
				A2(
					$author$project$Event$Join,
					$author$project$Timeline$Def$to12Nov1986,
					A2($author$project$Event$Join, $author$project$Event$Wormhole, $author$project$Timeline$Def$to12Nov2052)))
			]),
		A2($author$project$Event$sep, 1, 10),
		'Jonas goes back through the cave passageway to 1986, where he\'ll be sent to 2052 through wormhole in the bunker'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 12, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Charlotte, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 10),
		'Charlotte finds the photo of Ulrich in the 1953 newspaper records'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 12, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Peter, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Charlotte, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 1, 10),
		'Peter decides to tell Charlotte about time travel'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 12, $elm$time$Time$Nov, 2019),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Adult, $author$project$Event$Wormhole)
			]),
		A2($author$project$Event$sep, 1, 10),
		'Stranger-Jonas tries to destroy the cave passageway with the time machine, but instead creates the wormhole')
	]);
var $author$project$Person$Bartosz_2 = {$: 'Bartosz_2'};
var $author$project$Person$Claudia_2 = {$: 'Claudia_2'};
var $author$project$Person$Clausen = {$: 'Clausen'};
var $author$project$Person$Elisabeth = {$: 'Elisabeth'};
var $author$project$Timeline$Def$from21Jun1921 = A3(
	$author$project$Event$TraveledFrom,
	A3($author$project$Event$exact, 21, $elm$time$Time$Jun, 1921),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 2, 1));
var $author$project$Timeline$Def$to21Jun1987 = A3(
	$author$project$Event$TravelsTo,
	A3($author$project$Event$exact, 21, $elm$time$Time$Jun, 1921),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 2, 2));
var $author$project$Timeline$Def$to22Sep2020 = A3(
	$author$project$Event$TravelsTo,
	A3($author$project$Event$exact, 20, $elm$time$Time$Sep, 2020),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 3, 2));
var $author$project$Timeline$Def$to26Jun1954 = A3(
	$author$project$Event$TravelsTo,
	A3($author$project$Event$exact, 26, $elm$time$Time$Jun, 1954),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 2, 7));
var $author$project$Timeline$Def$to27Jun1888 = A3(
	$author$project$Event$TravelsTo,
	A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 1888),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 2, 8));
var $author$project$Timeline$Def$to27Jun1987 = A3(
	$author$project$Event$TravelsTo,
	A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 1921),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 2, 8));
var $author$project$Timeline$Def$to4Nov2019 = A3(
	$author$project$Event$TravelsTo,
	A3($author$project$Event$exact, 4, $elm$time$Time$Nov, 2019),
	$author$project$Event$Eva,
	A2($author$project$Event$sep, 2, 8));
var $author$project$Timeline$Y2020$y2020 = _List_fromArray(
	[
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 21, $elm$time$Time$Jun, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Clausen, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 1),
		'Clausen is placed in charge of the Winden police task force'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 21, $elm$time$Time$Jun, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Martha, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Bartosz, $author$project$Person$Teen, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 1),
		'Martha breaks up with Bartosz'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 21, $elm$time$Time$Jun, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Hannah, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 1),
		'Stranger-Jonas reveals himself to Hannah and tells her about time travel'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 21, $elm$time$Time$Jun, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Hanno_Noah, $author$project$Person$Adult, $author$project$Timeline$Def$from21Jun1921),
				_Utils_Tuple3($author$project$Person$Hannah, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 1),
		'Adult-Noah arrives from 1921 and meets Bartosz with the suitcase containing the time machine'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 21, $elm$time$Time$Jun, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Hannah, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 1),
		'Stranger-Jonas shows Hannah his time machine and they use it to travel to 1987'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 21, $elm$time$Time$Jun, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 2, 4),
		'Claudia visits the Winden library and learns about Regina and Alexander\'s marriage, her own disappearance from 1987, and Egon\'s death'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 21, $elm$time$Time$Jun, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Hannah, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Charlotte, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Peter, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Katharina, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 4),
		'Hannah, Charlotte, and Peter tell Katharina about time travel and how Mikkel and Ulric are stuck in the past'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 21, $elm$time$Time$Jun, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Martha, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Magnus, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Franziska, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Bartosz, $author$project$Person$Teen, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 4),
		'Martha, Magnus, and Fransizka find Bartosz with the time machine in the caves'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 21, $elm$time$Time$Jun, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Adult, $author$project$Timeline$Def$to21Jun1987)
			]),
		A2($author$project$Event$sep, 2, 4),
		'Claudia travels back to 1987'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 25, $elm$time$Time$Jun, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Hanno_Noah, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Charlotte, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 5),
		'Adult-Noah arrives reveals Charlotte that he\'s her father'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 25, $elm$time$Time$Jun, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Martha, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Magnus, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Franziska, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Bartosz, $author$project$Person$Teen, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 5),
		'Martha, Magnus, Franziska, and Elisabeth take the time machine from Bartocz'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 25, $elm$time$Time$Jun, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Martha, $author$project$Person$Teen, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 5),
		'Stranger-Jonas leaves the St. Christopher necklace in Martha\'s room'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 26, $elm$time$Time$Jun, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Hannah, $author$project$Person$Adult, $author$project$Timeline$Def$to26Jun1954),
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 2, 7),
		'Hannah steals the time machine from Stranger-Jonas and uses it to travel back to 1954'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 26, $elm$time$Time$Jun, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Magnus, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Bartosz, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Katharina, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 7),
		'Magnus gives Bartosz\'s time machine to Katharina'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Katharina, $author$project$Person$Adult, $author$project$Timeline$Def$to27Jun1987)
			]),
		A2($author$project$Event$sep, 2, 8),
		'Katharina leaves the Bartosz\'s time machine with Stranger-Jonas, and uses the caves to travel to 1987'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Hanno_Noah, $author$project$Person$Teen, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Martha_3, $author$project$Person$Teen, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 2, 8),
		'Young-Noah gives Stranger-Jonas the letter from Martha-3 which says he must let her die'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Adult, $author$project$Timeline$Def$to27Jun1888),
				_Utils_Tuple3($author$project$Person$Magnus, $author$project$Person$Teen, $author$project$Timeline$Def$to27Jun1888),
				_Utils_Tuple3($author$project$Person$Franziska, $author$project$Person$Teen, $author$project$Timeline$Def$to27Jun1888),
				_Utils_Tuple3($author$project$Person$Bartosz, $author$project$Person$Teen, $author$project$Timeline$Def$to27Jun1888)
			]),
		A2($author$project$Event$sep, 2, 8),
		'Stranger-Jonas saves Magnus, Franziska, and Bartosz by using the time machine to bring them to 1888'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Martha, $author$project$Person$Teen, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 8),
		'Martha leaves the bunker and goes back to the Kahnwald house'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Martha, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 8),
		'Martha finds Jonas in the Kahnwald house and they kiss'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Clausen, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Charlotte, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 8),
		'Clausen finds the radioactive waste barrels and orders them opened, while Charlotte tries and fails to stop him'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 2020),
		_List_Nil,
		A2($author$project$Event$sep, 2, 8),
		'The God Particle is released, opening a wormhole'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Regina, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 8),
		'Claudia brings adult-Regina into the bunker'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Peter, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Elisabeth, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Hanno_Noah, $author$project$Person$Teen, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 2, 8),
		'Peter, Elisabeth, and young-Noah make it to the bunker'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3(
				$author$project$Person$Charlotte,
				$author$project$Person$Adult,
				$author$project$Event$TravelsToUnknown_(2053)),
				_Utils_Tuple3($author$project$Person$Elisabeth, $author$project$Person$Adult, $author$project$Event$Wormhole)
			]),
		A2($author$project$Event$sep, 2, 8),
		'Charlotte sees adult-Elisabeth through the wormhole, and reaches to touch her, transporting herself to 2053'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3(
				$author$project$Person$Jonas,
				$author$project$Person$Old,
				$author$project$Event$TraveledFromUnknown_(1921)),
				_Utils_Tuple3($author$project$Person$Martha, $author$project$Person$Teen, $author$project$Event$Death)
			]),
		A2($author$project$Event$sep, 2, 8),
		'Adam arrives from 1921 and kills Martha'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Timeline$Def$to4Nov2019),
				_Utils_Tuple3($author$project$Person$Martha_2, $author$project$Person$Teen, $author$project$Timeline$Def$to4Nov2019)
			]),
		A2($author$project$Event$sep, 2, 8),
		'First reality: Martha-2 arrives in Jonas\' world and uses her own time machine to bring them to November 4, 2019, in World Two'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 3, 6),
		'From killing Martha by Adam, a second reality forms where Jonas simply hides in the basement and survives on his own, eventually pairing up with Claudia and becoming Stranger-Jonas'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Martha_2, $author$project$Person$Teen, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Bartosz_2, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Martha_3, $author$project$Person$Old, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 3, 7),
		'In the second reality formed From killing Martha by Adam, Martha-2 is intercepted by Bartosz-2 and brought to Eva, making her Martha-3'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3(
				$author$project$Person$Jonas,
				$author$project$Person$Old,
				$author$project$Event$TraveledFromUnknown_(1921))
			]),
		A2($author$project$Event$sep, 3, 8),
		'In a third reality, formed after the killing of Martha by Adam, Adam saves Jonas and explains how he needs to him to travel to the origin world and save Tannhaus family'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 2020),
		_List_Nil,
		A2($author$project$Event$sep, 2, 8),
		'The apocalypse happens in world one'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 22, $elm$time$Time$Sep, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Regina, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 3, 2),
		'Claudia is living in the abandoned police station with Regina'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 22, $elm$time$Time$Sep, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Peter, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Elisabeth, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Benni, $author$project$Person$Adult, $author$project$Event$Death),
				_Utils_Tuple3($author$project$Person$Charlotte, $author$project$Person$Adult, $author$project$Event$TravelsToUnknown),
				_Utils_Tuple3($author$project$Person$Franziska, $author$project$Person$Adult, $author$project$Event$TravelsToUnknown)
			]),
		A2($author$project$Event$sep, 3, 2),
		'Peler and Elisabeth are living in Benni\'s old trailer searching for Charlotte and Franziska among the reports of the dead bodied found'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 22, $elm$time$Time$Sep, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Tronte, $author$project$Person$Old, $author$project$Timeline$Def$to22Sep2020),
				_Utils_Tuple3($author$project$Person$Regina, $author$project$Person$Old, $author$project$Event$Death)
			]),
		A2($author$project$Event$sep, 3, 2),
		'Old-Tronte travels to 2020 and kills Regina on Old-Claudia\'s orders'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 23, $elm$time$Time$Sep, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Claudia_2, $author$project$Person$Old, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Old, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 3, 5),
		'Claudia-2 (from World Two) visits Claudia and gives her the brand new Trinity notebook'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 23, $elm$time$Time$Sep, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Old, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 3, 5),
		'Claudia begins working for Eva and ensuring the cycle of events stays the same'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 23, $elm$time$Time$Sep, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Elisabeth, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Peter, $author$project$Person$Adult, $author$project$Event$Death)
			]),
		A2($author$project$Event$sep, 3, 5),
		'Elisabeth is attacked by a stranger, who kills Peter before Elisabeth kills him'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 23, $elm$time$Time$Sep, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Elisabeth, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Hanno_Noah, $author$project$Person$Teen, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 3, 5),
		'Elisabeth goes to live with young-Noah in the caves'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 23, $elm$time$Time$Sep, 2020),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 3, 6),
		'Claudia goes to the power plant, where Jonas finds her and starts working with her to try and turn the God Particle into a time travel portal')
	]);
var $author$project$Timeline$Y2023$y2023 = _List_fromArray(
	[
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		$author$project$Event$throughout(2023),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 3, 7),
		'Jonas and Claudia keep working on the machine, but Jonas tires of their failure'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		$author$project$Event$throughout(2023),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Hanno_Noah, $author$project$Person$Teen, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 3, 2),
		'Jonas attempts to hang himself, but young-Noah comes in and saves him'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		$author$project$Event$throughout(2023),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Hanno_Noah, $author$project$Person$Teen, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 3, 7),
		'Young-Noah starts working with Claudia and Jonas to try and create the portal')
	]);
var $author$project$Timeline$Def$to11Nov1953 = A3(
	$author$project$Event$TravelsTo,
	A3($author$project$Event$exact, 11, $elm$time$Time$Nov, 1953),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 1, 9));
var $author$project$Timeline$Y2040$y2040 = _List_fromArray(
	[
		A5(
		$author$project$Event$Event,
		$author$project$Event$Eva,
		$author$project$Event$throughout(2040),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Claudia_2, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Martha_3, $author$project$Person$Old, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 3, 7),
		'Claudia-2 checks in on Claudia and says Eva wants to make sure the portal doesn\'t work yet'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Eva,
		$author$project$Event$throughout(2040),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Claudia_2, $author$project$Person$Adult, $author$project$Event$Death),
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Martha_3, $author$project$Person$Old, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 3, 7),
		'Claudia kills Claudia-2 and starts impersonating her to Eva'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Eva,
		$author$project$Event$throughout(2040),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Martha_3, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 3, 7),
		'Claudia goes to Erit Lux headquaters, where adult-Martha-3 gives her the blueprints for the time machine'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Eva,
		$author$project$Event$throughout(2040),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Adult, $author$project$Timeline$Def$to11Nov1953)
			]),
		A2($author$project$Event$sep, 3, 7),
		'Claudia takes the blueprints taken from Martha-3 to World One Tannhaus in 1953'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		$author$project$Event$throughout(2040),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Hanno_Noah, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Adult, $author$project$Event$Belongs)
			]),
		A2($author$project$Event$sep, 3, 7),
		'Adult-Noah argues with Jonas, who has grown into Stranger-Jonas, over Claudia trustworthiness'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		$author$project$Event$throughout(2040),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Elisabeth, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Charlotte, $author$project$Person$Child, $author$project$Event$Birth)
			]),
		A2($author$project$Event$sep, 3, 7),
		'Adult-Elisabeth gives birth to Charlotte')
	]);
var $author$project$Timeline$Def$from12Nov1986 = A3(
	$author$project$Event$TraveledFrom,
	A3($author$project$Event$exact, 12, $elm$time$Time$Nov, 1986),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 1, 10));
var $author$project$Timeline$Def$to6Nov2019 = A3(
	$author$project$Event$TravelsTo,
	A3($author$project$Event$exact, 6, $elm$time$Time$Nov, 2019),
	$author$project$Event$Eva,
	A2($author$project$Event$sep, 3, 3));
var $author$project$Timeline$Y2052$y2052 = _List_fromArray(
	[
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		$author$project$Event$throughout(2052),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Claudia, $author$project$Person$Old, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3(
				$author$project$Person$Jonas,
				$author$project$Person$Adult,
				$author$project$Event$TravelsToUnknown_(2019))
			]),
		A2($author$project$Event$sep, 3, 7),
		'Old-Claudia senss Stranger-Jonas to 2019 so he can help start the cycles again'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Eva,
		A3($author$project$Event$exact, 6, $elm$time$Time$Nov, 2052),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Martha_2, $author$project$Person$Teen, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Martha_3, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 3, 3),
		'Martha-3 and Jonas emerge from the caves and are greeted by adult-Martha-3'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Eva,
		A3($author$project$Event$exact, 6, $elm$time$Time$Nov, 2052),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Martha_2, $author$project$Person$Teen, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Martha_3, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 3, 3),
		'Adult-Martha-3 tells Jonas he can\'t save his Martha, but that he can be happy with Martha-2'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Eva,
		A3($author$project$Event$exact, 6, $elm$time$Time$Nov, 2052),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Martha_2, $author$project$Person$Teen, $author$project$Timeline$Def$to6Nov2019),
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Timeline$Def$to6Nov2019),
				_Utils_Tuple3($author$project$Person$Unknown, $author$project$Person$Child, $author$project$Event$Birth)
			]),
		A2($author$project$Event$sep, 3, 3),
		'Jonas and Martha-2 return to 2019 in World Two, and they concieve the Unknown'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Eva,
		A3($author$project$Event$exact, 7, $elm$time$Time$Nov, 2052),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Martha_3, $author$project$Person$Old, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 3, 3),
		'Eva orchestrates her plan from the sand-covered Erit-Lux headquarters'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Eva,
		A3($author$project$Event$exact, 7, $elm$time$Time$Nov, 2052),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Bartosz_2, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Martha_3, $author$project$Person$Teen, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Martha_3, $author$project$Person$Old, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Event$Death)
			]),
		A2($author$project$Event$sep, 3, 7),
		'Bartosz-2 brings Martha-3 to Eva, who cuts her face and orders her to kill Jonas'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Eva,
		A3($author$project$Event$exact, 7, $elm$time$Time$Nov, 2052),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Old, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Martha_3, $author$project$Person$Old, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 3, 8),
		'Adam travels to confront Eva one final time, and expains how he\'s finally ending the cycle'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Eva,
		A3($author$project$Event$exact, 12, $elm$time$Time$Nov, 2052),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Timeline$Def$from12Nov1986),
				_Utils_Tuple3($author$project$Person$Silja, $author$project$Person$Teen, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 1, 10),
		'Jonas arrives from 1986 and is found by Silja')
	]);
var $author$project$Person$Claudia_3 = {$: 'Claudia_3'};
var $elm$time$Time$Feb = {$: 'Feb'};
var $author$project$Event$Someday = F2(
	function (a, b) {
		return {$: 'Someday', a: a, b: b};
	});
var $author$project$Event$someday = $author$project$Event$Someday;
var $author$project$Timeline$Def$to27June2019 = A3(
	$author$project$Event$TravelsTo,
	A3($author$project$Event$exact, 27, $elm$time$Time$Jun, 2019),
	$author$project$Event$Adam,
	A2($author$project$Event$sep, 3, 8));
var $author$project$Timeline$Y2053$y2053 = _List_fromArray(
	[
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A2($author$project$Event$someday, $elm$time$Time$Feb, 2053),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Elisabeth, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 2, 2),
		'Adult-Elisabeth catches Jonas breaking into the power plant and almost hangs him'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A2($author$project$Event$someday, $elm$time$Time$Feb, 2053),
		_List_fromArray(
			[
				_Utils_Tuple3(
				$author$project$Person$Silja,
				$author$project$Person$Teen,
				$author$project$Event$TraveledFromUnknown_(1911)),
				_Utils_Tuple3(
				$author$project$Person$Jonas,
				$author$project$Person$Teen,
				$author$project$Event$TravelsToUnknown_(1921))
			]),
		A2($author$project$Event$sep, 2, 2),
		'Silja helps Jonas back into the power plant where he enters the portal and travels back to 1921'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A2($author$project$Event$someday, $elm$time$Time$Feb, 2053),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Elisabeth, $author$project$Person$Adult, $author$project$Event$Wormhole)
			]),
		A2($author$project$Event$sep, 2, 8),
		'Adult-Elisabeth is inside the power plant when the wormhole opens again'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A2($author$project$Event$someday, $elm$time$Time$Feb, 2053),
		_List_fromArray(
			[
				_Utils_Tuple3(
				$author$project$Person$Charlotte,
				$author$project$Person$Adult,
				A2(
					$author$project$Event$Join,
					$author$project$Event$Wormhole,
					$author$project$Event$TraveledFromUnknown_(2020))),
				_Utils_Tuple3($author$project$Person$Elisabeth, $author$project$Person$Adult, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 2, 8),
		'Charlotte arrives from 2020 after touching Elisabeth\'s hand through the wormhole'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 22, $elm$time$Time$Sep, 2053),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Old, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 3, 3),
		'Adam relocates the Sic Mundus headquarters to the power plant'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 22, $elm$time$Time$Sep, 2053),
		_List_fromArray(
			[
				_Utils_Tuple3(
				$author$project$Person$Martha_2,
				$author$project$Person$Teen,
				$author$project$Event$TraveledFromUnknown_(1888))
			]),
		A2($author$project$Event$sep, 3, 4),
		'Martha-2 returns from 1888'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 22, $elm$time$Time$Sep, 2053),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Old, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3(
				$author$project$Person$Martha_2,
				$author$project$Person$Teen,
				$author$project$Event$TraveledFromUnknown_(1888)),
				_Utils_Tuple3($author$project$Person$Unknown, $author$project$Person$Child, $author$project$Event$Birth)
			]),
		A2($author$project$Event$sep, 3, 4),
		'Adam tells Martha-2 that she\'s pregnant and that the Unknown child is the origin. He imprisons her'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 23, $elm$time$Time$Sep, 2053),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Charlotte, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Elisabeth, $author$project$Person$Adult, $author$project$Event$Belongs),
				_Utils_Tuple3($author$project$Person$Charlotte, $author$project$Person$Child, $author$project$Event$TravelsToUnknown)
			]),
		A2($author$project$Event$sep, 3, 5),
		'Adult-Charlotte and adult-Elisabeth travel back to 2041 to steal baby-Charlotte'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 24, $elm$time$Time$Sep, 2053),
		_List_fromArray(
			[
				_Utils_Tuple3(
				$author$project$Person$Magnus,
				$author$project$Person$Adult,
				A2($author$project$Event$Join, $author$project$Event$TraveledFromUnknown, $author$project$Event$TravelsToUnknown)),
				_Utils_Tuple3(
				$author$project$Person$Franziska,
				$author$project$Person$Adult,
				A2($author$project$Event$Join, $author$project$Event$TraveledFromUnknown, $author$project$Event$TravelsToUnknown)),
				_Utils_Tuple3($author$project$Person$Martha_2, $author$project$Person$Teen, $author$project$Event$TravelsToUnknown)
			]),
		A2($author$project$Event$sep, 3, 6),
		'Adult-Magnus and adult-Franziska travel to world two to intercept Martha-2 on the day of the apocalypse'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 24, $elm$time$Time$Sep, 2053),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Old, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Martha_2, $author$project$Person$Teen, $author$project$Event$Death)
			]),
		A2($author$project$Event$sep, 3, 6),
		'Adam kills Martha-2'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 24, $elm$time$Time$Sep, 2053),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Old, $author$project$Event$TraveledFromUnknown),
				_Utils_Tuple3($author$project$Person$Claudia_3, $author$project$Person$Old, $author$project$Event$TraveledFromUnknown)
			]),
		A2($author$project$Event$sep, 3, 8),
		'Old-Claudia-3 reveals the existence of the Origin World to Adam'),
		A5(
		$author$project$Event$Event,
		$author$project$Event$Adam,
		A3($author$project$Event$exact, 24, $elm$time$Time$Sep, 2053),
		_List_fromArray(
			[
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Old, $author$project$Timeline$Def$to27June2019),
				_Utils_Tuple3($author$project$Person$Jonas, $author$project$Person$Teen, $author$project$Timeline$Def$to27June2019),
				_Utils_Tuple3($author$project$Person$Martha_2, $author$project$Person$Teen, $author$project$Timeline$Def$to27June2019)
			]),
		A2($author$project$Event$sep, 3, 8),
		'Adam travels back to 27 June 2019 to create third reality where Jonas takes Martha-2 to Origin World and saves Tannhaus\' family')
	]);
var $author$project$Timeline$timeline = _Utils_ap(
	$author$project$Timeline$Y1888$y1888,
	_Utils_ap(
		$author$project$Timeline$Y1890$y1890,
		_Utils_ap(
			$author$project$Timeline$Y1904$y1904,
			_Utils_ap(
				$author$project$Timeline$Y1910$y1910,
				_Utils_ap(
					$author$project$Timeline$Y1911$y1911,
					_Utils_ap(
						$author$project$Timeline$Y1920$y1920,
						_Utils_ap(
							$author$project$Timeline$Y1921$y1921,
							_Utils_ap(
								$author$project$Timeline$Y1953$y1953,
								_Utils_ap(
									$author$project$Timeline$Y1954$y1954,
									_Utils_ap(
										$author$project$Timeline$Y1971$y1971,
										_Utils_ap(
											$author$project$Timeline$Y1974$y1974,
											_Utils_ap(
												$author$project$Timeline$Y1986$y1986,
												_Utils_ap(
													$author$project$Timeline$Y1987$y1987,
													_Utils_ap(
														$author$project$Timeline$Y2019$y2019,
														_Utils_ap(
															$author$project$Timeline$Y2020$y2020,
															_Utils_ap(
																$author$project$Timeline$Y2023$y2023,
																_Utils_ap(
																	$author$project$Timeline$Y2040$y2040,
																	_Utils_ap($author$project$Timeline$Y2052$y2052, $author$project$Timeline$Y2053$y2053))))))))))))))))));
var $author$project$Main$init = function (_v0) {
	return _Utils_Tuple2(
		$author$project$Main$Timeline(
			A2($elm_community$graph$Graph$fromNodeLabelsAndEdgePairs, $author$project$Timeline$timeline, _List_Nil)),
		$elm$core$Platform$Cmd$none);
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $author$project$Main$subscription = function (_v0) {
	return $elm$core$Platform$Sub$none;
};
var $author$project$Main$Genealogy = function (a) {
	return {$: 'Genealogy', a: a};
};
var $author$project$Person$Daniel = {$: 'Daniel'};
var $author$project$Person$Jana = {$: 'Jana'};
var $author$project$Gen$Def$AdoptFather = {$: 'AdoptFather'};
var $author$project$Gen$Def$adoptFatherTo = $author$project$Gen$Def$AdoptFather;
var $author$project$Gen$Def$AdoptMother = {$: 'AdoptMother'};
var $author$project$Gen$Def$adoptMotherTo = $author$project$Gen$Def$AdoptMother;
var $author$project$Gen$Def$fact = F3(
	function (from, rel, to) {
		return _Utils_Tuple3(from, rel, to);
	});
var $author$project$Gen$Def$Father = {$: 'Father'};
var $author$project$Gen$Def$fatherTo = $author$project$Gen$Def$Father;
var $author$project$Gen$Def$Mother = {$: 'Mother'};
var $author$project$Gen$Def$motherTo = $author$project$Gen$Def$Mother;
var $author$project$Gen$Tree$adam = _Utils_Tuple2(
	$author$project$Event$Adam,
	_List_fromArray(
		[
			A3($author$project$Gen$Def$fact, $author$project$Person$Bernd, $author$project$Gen$Def$fatherTo, $author$project$Person$Helge),
			A3($author$project$Gen$Def$fact, $author$project$Person$Gretchen, $author$project$Gen$Def$motherTo, $author$project$Person$Helge),
			A3($author$project$Gen$Def$fact, $author$project$Person$Helge, $author$project$Gen$Def$fatherTo, $author$project$Person$Peter),
			A3($author$project$Gen$Def$fact, $author$project$Person$Charlotte, $author$project$Gen$Def$motherTo, $author$project$Person$Elisabeth),
			A3($author$project$Gen$Def$fact, $author$project$Person$Charlotte, $author$project$Gen$Def$motherTo, $author$project$Person$Franziska),
			A3($author$project$Gen$Def$fact, $author$project$Person$Peter, $author$project$Gen$Def$fatherTo, $author$project$Person$Elisabeth),
			A3($author$project$Gen$Def$fact, $author$project$Person$Peter, $author$project$Gen$Def$fatherTo, $author$project$Person$Franziska),
			A3($author$project$Gen$Def$fact, $author$project$Person$HGTannhaus, $author$project$Gen$Def$adoptFatherTo, $author$project$Person$Charlotte),
			A3($author$project$Gen$Def$fact, $author$project$Person$Elisabeth, $author$project$Gen$Def$motherTo, $author$project$Person$Charlotte),
			A3($author$project$Gen$Def$fact, $author$project$Person$Hanno_Noah, $author$project$Gen$Def$fatherTo, $author$project$Person$Charlotte),
			A3($author$project$Gen$Def$fact, $author$project$Person$Doris, $author$project$Gen$Def$motherTo, $author$project$Person$Claudia),
			A3($author$project$Gen$Def$fact, $author$project$Person$Egon, $author$project$Gen$Def$fatherTo, $author$project$Person$Claudia),
			A3($author$project$Gen$Def$fact, $author$project$Person$Claudia, $author$project$Gen$Def$motherTo, $author$project$Person$Regina),
			A3($author$project$Gen$Def$fact, $author$project$Person$Bernd, $author$project$Gen$Def$fatherTo, $author$project$Person$Regina),
			A3($author$project$Gen$Def$fact, $author$project$Person$Regina, $author$project$Gen$Def$motherTo, $author$project$Person$Bartosz),
			A3($author$project$Gen$Def$fact, $author$project$Person$Boris_Aleksander, $author$project$Gen$Def$fatherTo, $author$project$Person$Bartosz),
			A3($author$project$Gen$Def$fact, $author$project$Person$Bartosz, $author$project$Gen$Def$fatherTo, $author$project$Person$Hanno_Noah),
			A3($author$project$Gen$Def$fact, $author$project$Person$Bartosz, $author$project$Gen$Def$fatherTo, $author$project$Person$Agnes),
			A3($author$project$Gen$Def$fact, $author$project$Person$Silja, $author$project$Gen$Def$motherTo, $author$project$Person$Hanno_Noah),
			A3($author$project$Gen$Def$fact, $author$project$Person$Silja, $author$project$Gen$Def$motherTo, $author$project$Person$Agnes),
			A3($author$project$Gen$Def$fact, $author$project$Person$Hannah, $author$project$Gen$Def$motherTo, $author$project$Person$Silja),
			A3($author$project$Gen$Def$fact, $author$project$Person$Egon, $author$project$Gen$Def$fatherTo, $author$project$Person$Silja),
			A3($author$project$Gen$Def$fact, $author$project$Person$Hannah, $author$project$Gen$Def$motherTo, $author$project$Person$Jonas),
			A3($author$project$Gen$Def$fact, $author$project$Person$Mikkel, $author$project$Gen$Def$fatherTo, $author$project$Person$Jonas),
			A3($author$project$Gen$Def$fact, $author$project$Person$Daniel, $author$project$Gen$Def$fatherTo, $author$project$Person$Ines),
			A3($author$project$Gen$Def$fact, $author$project$Person$Ines, $author$project$Gen$Def$adoptMotherTo, $author$project$Person$Mikkel),
			A3($author$project$Gen$Def$fact, $author$project$Person$Ulrich, $author$project$Gen$Def$fatherTo, $author$project$Person$Mikkel),
			A3($author$project$Gen$Def$fact, $author$project$Person$Ulrich, $author$project$Gen$Def$fatherTo, $author$project$Person$Martha),
			A3($author$project$Gen$Def$fact, $author$project$Person$Ulrich, $author$project$Gen$Def$fatherTo, $author$project$Person$Magnus),
			A3($author$project$Gen$Def$fact, $author$project$Person$Katharina, $author$project$Gen$Def$motherTo, $author$project$Person$Mikkel),
			A3($author$project$Gen$Def$fact, $author$project$Person$Katharina, $author$project$Gen$Def$motherTo, $author$project$Person$Martha),
			A3($author$project$Gen$Def$fact, $author$project$Person$Katharina, $author$project$Gen$Def$motherTo, $author$project$Person$Magnus),
			A3($author$project$Gen$Def$fact, $author$project$Person$Helene, $author$project$Gen$Def$motherTo, $author$project$Person$Katharina),
			A3($author$project$Gen$Def$fact, $author$project$Person$Agnes, $author$project$Gen$Def$motherTo, $author$project$Person$Tronte),
			A3($author$project$Gen$Def$fact, $author$project$Person$Unknown, $author$project$Gen$Def$fatherTo, $author$project$Person$Tronte),
			A3($author$project$Gen$Def$fact, $author$project$Person$Jana, $author$project$Gen$Def$motherTo, $author$project$Person$Mads),
			A3($author$project$Gen$Def$fact, $author$project$Person$Tronte, $author$project$Gen$Def$fatherTo, $author$project$Person$Mads),
			A3($author$project$Gen$Def$fact, $author$project$Person$Jana, $author$project$Gen$Def$motherTo, $author$project$Person$Ulrich),
			A3($author$project$Gen$Def$fact, $author$project$Person$Tronte, $author$project$Gen$Def$fatherTo, $author$project$Person$Ulrich),
			A3($author$project$Gen$Def$fact, $author$project$Person$Jonas, $author$project$Gen$Def$fatherTo, $author$project$Person$Unknown)
		]));
var $author$project$Person$codename = function (person) {
	codename:
	while (true) {
		switch (person.$) {
			case 'Agnes':
				return 'agnes';
			case 'Bartosz':
				return 'bartosz';
			case 'Bartosz_2':
				var $temp$person = $author$project$Person$Bartosz;
				person = $temp$person;
				continue codename;
			case 'Boris_Aleksander':
				return 'aleksander';
			case 'Benjamin':
				return 'benjamin';
			case 'Benni':
				return 'benni';
			case 'Bernandette':
				return 'bernandette';
			case 'Bernd':
				return 'bernd';
			case 'Charlotte':
				return 'charlotte';
			case 'Claudia':
				return 'claudia';
			case 'Claudia_2':
				var $temp$person = $author$project$Person$Claudia;
				person = $temp$person;
				continue codename;
			case 'Claudia_3':
				var $temp$person = $author$project$Person$Claudia;
				person = $temp$person;
				continue codename;
			case 'Clausen':
				return 'clausen';
			case 'Daniel':
				return 'daniel';
			case 'Doris':
				return 'doris';
			case 'Egon':
				return 'egon';
			case 'Elisabeth':
				return 'elisabeth';
			case 'Erik':
				return 'erik';
			case 'Franziska':
				return 'franziska';
			case 'Gretchen':
				return 'greta';
			case 'Gustav':
				return 'gustav';
			case 'Hannah':
				return 'hannah';
			case 'Hanno_Noah':
				return 'hanno';
			case 'Heinrich':
				return 'heinrich';
			case 'Helene':
				return 'helene';
			case 'Helge':
				return 'helge';
			case 'HGTannhaus':
				return 'hg_tannhaus';
			case 'Ines':
				return 'ines';
			case 'Jana':
				return 'jana';
			case 'Jonas':
				return 'jonas';
			case 'Jurgen':
				return 'jurgen';
			case 'Katharina':
				return 'katharina';
			case 'Killian':
				return 'killian';
			case 'Leopold':
				return 'leopold';
			case 'Mads':
				return 'mads';
			case 'Magnus':
				return 'magnus';
			case 'Marek':
				return 'marek';
			case 'Martha':
				return 'martha';
			case 'Martha_2':
				var $temp$person = $author$project$Person$Martha;
				person = $temp$person;
				continue codename;
			case 'Martha_3':
				var $temp$person = $author$project$Person$Martha;
				person = $temp$person;
				continue codename;
			case 'Mikkel':
				return 'mikkel';
			case 'Obendorf':
				return 'obendorf';
			case 'Peter':
				return 'peter';
			case 'Regina':
				return 'regina';
			case 'Silja':
				return 'silja';
			case 'Sonja':
				return 'sonja';
			case 'Torben':
				return 'torben';
			case 'Tronte':
				return 'tronte';
			case 'Ulla':
				return 'ulla';
			case 'Ulrich':
				return 'ulrich';
			case 'Unknown':
				return 'unknown';
			default:
				return 'yasin';
		}
	}
};
var $author$project$Gen$Tree$eva = _Utils_Tuple2(
	$author$project$Event$Eva,
	_List_fromArray(
		[
			A3($author$project$Gen$Def$fact, $author$project$Person$Bernd, $author$project$Gen$Def$fatherTo, $author$project$Person$Helge),
			A3($author$project$Gen$Def$fact, $author$project$Person$Gretchen, $author$project$Gen$Def$motherTo, $author$project$Person$Helge),
			A3($author$project$Gen$Def$fact, $author$project$Person$Helge, $author$project$Gen$Def$fatherTo, $author$project$Person$Peter),
			A3($author$project$Gen$Def$fact, $author$project$Person$Charlotte, $author$project$Gen$Def$motherTo, $author$project$Person$Elisabeth),
			A3($author$project$Gen$Def$fact, $author$project$Person$Charlotte, $author$project$Gen$Def$motherTo, $author$project$Person$Franziska),
			A3($author$project$Gen$Def$fact, $author$project$Person$Peter, $author$project$Gen$Def$fatherTo, $author$project$Person$Elisabeth),
			A3($author$project$Gen$Def$fact, $author$project$Person$Peter, $author$project$Gen$Def$fatherTo, $author$project$Person$Franziska),
			A3($author$project$Gen$Def$fact, $author$project$Person$HGTannhaus, $author$project$Gen$Def$adoptFatherTo, $author$project$Person$Charlotte),
			A3($author$project$Gen$Def$fact, $author$project$Person$Elisabeth, $author$project$Gen$Def$motherTo, $author$project$Person$Charlotte),
			A3($author$project$Gen$Def$fact, $author$project$Person$Hanno_Noah, $author$project$Gen$Def$fatherTo, $author$project$Person$Charlotte),
			A3($author$project$Gen$Def$fact, $author$project$Person$Doris, $author$project$Gen$Def$motherTo, $author$project$Person$Claudia),
			A3($author$project$Gen$Def$fact, $author$project$Person$Egon, $author$project$Gen$Def$fatherTo, $author$project$Person$Claudia),
			A3($author$project$Gen$Def$fact, $author$project$Person$Claudia, $author$project$Gen$Def$motherTo, $author$project$Person$Regina),
			A3($author$project$Gen$Def$fact, $author$project$Person$Bernd, $author$project$Gen$Def$fatherTo, $author$project$Person$Regina),
			A3($author$project$Gen$Def$fact, $author$project$Person$Regina, $author$project$Gen$Def$motherTo, $author$project$Person$Bartosz),
			A3($author$project$Gen$Def$fact, $author$project$Person$Boris_Aleksander, $author$project$Gen$Def$fatherTo, $author$project$Person$Bartosz),
			A3($author$project$Gen$Def$fact, $author$project$Person$Bartosz, $author$project$Gen$Def$fatherTo, $author$project$Person$Hanno_Noah),
			A3($author$project$Gen$Def$fact, $author$project$Person$Bartosz, $author$project$Gen$Def$fatherTo, $author$project$Person$Agnes),
			A3($author$project$Gen$Def$fact, $author$project$Person$Silja, $author$project$Gen$Def$motherTo, $author$project$Person$Hanno_Noah),
			A3($author$project$Gen$Def$fact, $author$project$Person$Silja, $author$project$Gen$Def$motherTo, $author$project$Person$Agnes),
			A3($author$project$Gen$Def$fact, $author$project$Person$Hannah, $author$project$Gen$Def$motherTo, $author$project$Person$Silja),
			A3($author$project$Gen$Def$fact, $author$project$Person$Egon, $author$project$Gen$Def$fatherTo, $author$project$Person$Silja),
			A3($author$project$Gen$Def$fact, $author$project$Person$Ulrich, $author$project$Gen$Def$fatherTo, $author$project$Person$Mikkel),
			A3($author$project$Gen$Def$fact, $author$project$Person$Ulrich, $author$project$Gen$Def$fatherTo, $author$project$Person$Martha),
			A3($author$project$Gen$Def$fact, $author$project$Person$Ulrich, $author$project$Gen$Def$fatherTo, $author$project$Person$Magnus),
			A3($author$project$Gen$Def$fact, $author$project$Person$Katharina, $author$project$Gen$Def$motherTo, $author$project$Person$Mikkel),
			A3($author$project$Gen$Def$fact, $author$project$Person$Katharina, $author$project$Gen$Def$motherTo, $author$project$Person$Martha),
			A3($author$project$Gen$Def$fact, $author$project$Person$Katharina, $author$project$Gen$Def$motherTo, $author$project$Person$Magnus),
			A3($author$project$Gen$Def$fact, $author$project$Person$Helene, $author$project$Gen$Def$motherTo, $author$project$Person$Katharina),
			A3($author$project$Gen$Def$fact, $author$project$Person$Agnes, $author$project$Gen$Def$motherTo, $author$project$Person$Tronte),
			A3($author$project$Gen$Def$fact, $author$project$Person$Unknown, $author$project$Gen$Def$fatherTo, $author$project$Person$Tronte),
			A3($author$project$Gen$Def$fact, $author$project$Person$Jana, $author$project$Gen$Def$motherTo, $author$project$Person$Mads),
			A3($author$project$Gen$Def$fact, $author$project$Person$Tronte, $author$project$Gen$Def$fatherTo, $author$project$Person$Mads),
			A3($author$project$Gen$Def$fact, $author$project$Person$Jana, $author$project$Gen$Def$motherTo, $author$project$Person$Ulrich),
			A3($author$project$Gen$Def$fact, $author$project$Person$Tronte, $author$project$Gen$Def$fatherTo, $author$project$Person$Ulrich),
			A3($author$project$Gen$Def$fact, $author$project$Person$Martha, $author$project$Gen$Def$motherTo, $author$project$Person$Unknown)
		]));
var $author$project$Person$Benjamin = {$: 'Benjamin'};
var $author$project$Gen$Tree$origin = _Utils_Tuple2(
	$author$project$Event$Origin_2,
	_List_fromArray(
		[
			A3($author$project$Gen$Def$fact, $author$project$Person$HGTannhaus, $author$project$Gen$Def$fatherTo, $author$project$Person$Marek),
			A3($author$project$Gen$Def$fact, $author$project$Person$Marek, $author$project$Gen$Def$fatherTo, $author$project$Person$Charlotte),
			A3($author$project$Gen$Def$fact, $author$project$Person$Sonja, $author$project$Gen$Def$motherTo, $author$project$Person$Charlotte),
			A3($author$project$Gen$Def$fact, $author$project$Person$Bernd, $author$project$Gen$Def$adoptFatherTo, $author$project$Person$Helge),
			A3($author$project$Gen$Def$fact, $author$project$Person$Gretchen, $author$project$Gen$Def$adoptMotherTo, $author$project$Person$Helge),
			A3($author$project$Gen$Def$fact, $author$project$Person$Helge, $author$project$Gen$Def$fatherTo, $author$project$Person$Peter),
			A3($author$project$Gen$Def$fact, $author$project$Person$Peter, $author$project$Gen$Def$fatherTo, $author$project$Person$Benjamin),
			A3($author$project$Gen$Def$fact, $author$project$Person$Torben, $author$project$Gen$Def$fatherTo, $author$project$Person$Jonas),
			A3($author$project$Gen$Def$fact, $author$project$Person$Hannah, $author$project$Gen$Def$motherTo, $author$project$Person$Jonas),
			A3($author$project$Gen$Def$fact, $author$project$Person$Egon, $author$project$Gen$Def$fatherTo, $author$project$Person$Claudia),
			A3($author$project$Gen$Def$fact, $author$project$Person$Doris, $author$project$Gen$Def$motherTo, $author$project$Person$Claudia),
			A3($author$project$Gen$Def$fact, $author$project$Person$Claudia, $author$project$Gen$Def$motherTo, $author$project$Person$Regina),
			A3($author$project$Gen$Def$fact, $author$project$Person$Helene, $author$project$Gen$Def$motherTo, $author$project$Person$Katharina)
		]));
var $elm_community$graph$Graph$DOT$Styles = F4(
	function (rankdir, graph, node, edge) {
		return {edge: edge, graph: graph, node: node, rankdir: rankdir};
	});
var $elm_community$graph$Graph$DOT$TB = {$: 'TB'};
var $elm_community$graph$Graph$DOT$defaultStyles = A4($elm_community$graph$Graph$DOT$Styles, $elm_community$graph$Graph$DOT$TB, '', '', '');
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Basics$compare = _Utils_compare;
var $elm_community$intdict$IntDict$foldl = F3(
	function (f, acc, dict) {
		foldl:
		while (true) {
			switch (dict.$) {
				case 'Empty':
					return acc;
				case 'Leaf':
					var l = dict.a;
					return A3(f, l.key, l.value, acc);
				default:
					var i = dict.a;
					var $temp$f = f,
						$temp$acc = A3($elm_community$intdict$IntDict$foldl, f, acc, i.left),
						$temp$dict = i.right;
					f = $temp$f;
					acc = $temp$acc;
					dict = $temp$dict;
					continue foldl;
			}
		}
	});
var $elm_community$graph$Graph$unGraph = function (graph) {
	var rep = graph.a;
	return rep;
};
var $elm_community$graph$Graph$edges = function (graph) {
	var flippedFoldl = F3(
		function (f, dict, list) {
			return A3($elm_community$intdict$IntDict$foldl, f, list, dict);
		});
	var prependEdges = F2(
		function (node1, ctx) {
			return A2(
				flippedFoldl,
				F2(
					function (node2, e) {
						return $elm$core$List$cons(
							{from: node1, label: e, to: node2});
					}),
				ctx.outgoing);
		});
	return A3(
		flippedFoldl,
		prependEdges,
		$elm_community$graph$Graph$unGraph(graph),
		_List_Nil);
};
var $elm$core$Dict$isEmpty = function (dict) {
	if (dict.$ === 'RBEmpty_elm_builtin') {
		return true;
	} else {
		return false;
	}
};
var $elm_community$intdict$IntDict$foldr = F3(
	function (f, acc, dict) {
		foldr:
		while (true) {
			switch (dict.$) {
				case 'Empty':
					return acc;
				case 'Leaf':
					var l = dict.a;
					return A3(f, l.key, l.value, acc);
				default:
					var i = dict.a;
					var $temp$f = f,
						$temp$acc = A3($elm_community$intdict$IntDict$foldr, f, acc, i.right),
						$temp$dict = i.left;
					f = $temp$f;
					acc = $temp$acc;
					dict = $temp$dict;
					continue foldr;
			}
		}
	});
var $elm_community$intdict$IntDict$values = function (dict) {
	return A3(
		$elm_community$intdict$IntDict$foldr,
		F3(
			function (key, value, valueList) {
				return A2($elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var $elm_community$graph$Graph$nodes = A2(
	$elm$core$Basics$composeR,
	$elm_community$graph$Graph$unGraph,
	A2(
		$elm$core$Basics$composeR,
		$elm_community$intdict$IntDict$values,
		$elm$core$List$map(
			function ($) {
				return $.node;
			})));
var $elm$core$List$sortWith = _List_sortWith;
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm_community$graph$Graph$DOT$outputWithStylesAndAttributes = F4(
	function (styles, nodeAttrs, edgeAttrs, graph) {
		var rankDirToString = function (r) {
			switch (r.$) {
				case 'TB':
					return 'TB';
				case 'LR':
					return 'LR';
				case 'BT':
					return 'BT';
				default:
					return 'RL';
			}
		};
		var nodes = $elm_community$graph$Graph$nodes(graph);
		var encode = A2(
			$elm$core$Basics$composeR,
			$elm$json$Json$Encode$string,
			$elm$json$Json$Encode$encode(0));
		var edges = function () {
			var compareEdge = F2(
				function (a, b) {
					var _v1 = A2($elm$core$Basics$compare, a.from, b.from);
					switch (_v1.$) {
						case 'LT':
							return $elm$core$Basics$LT;
						case 'GT':
							return $elm$core$Basics$GT;
						default:
							return A2($elm$core$Basics$compare, a.to, b.to);
					}
				});
			return A2(
				$elm$core$List$sortWith,
				compareEdge,
				$elm_community$graph$Graph$edges(graph));
		}();
		var attrAssocs = A2(
			$elm$core$Basics$composeR,
			$elm$core$Dict$toList,
			A2(
				$elm$core$Basics$composeR,
				$elm$core$List$map(
					function (_v0) {
						var k = _v0.a;
						var v = _v0.b;
						return k + ('=' + encode(v));
					}),
				$elm$core$String$join(', ')));
		var makeAttrs = function (d) {
			return $elm$core$Dict$isEmpty(d) ? '' : (' [' + (attrAssocs(d) + ']'));
		};
		var edge = function (e) {
			return '  ' + ($elm$core$String$fromInt(e.from) + (' -> ' + ($elm$core$String$fromInt(e.to) + makeAttrs(
				edgeAttrs(e.label)))));
		};
		var edgesString = A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$map, edge, edges));
		var node = function (n) {
			return '  ' + ($elm$core$String$fromInt(n.id) + makeAttrs(
				nodeAttrs(n.label)));
		};
		var nodesString = A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$map, node, nodes));
		return A2(
			$elm$core$String$join,
			'\n',
			_List_fromArray(
				[
					'digraph G {',
					'  rankdir=' + rankDirToString(styles.rankdir),
					'  graph [' + (styles.graph + ']'),
					'  node [' + (styles.node + ']'),
					'  edge [' + (styles.edge + ']'),
					'',
					edgesString,
					'',
					nodesString,
					'}'
				]));
	});
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$singleton = F2(
	function (key, value) {
		return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
	});
var $elm_community$graph$Graph$DOT$outputWithStyles = F4(
	function (styles, mapNode, mapEdge, graph) {
		var labelOnly = function (maybeLabel) {
			if (maybeLabel.$ === 'Nothing') {
				return $elm$core$Dict$empty;
			} else {
				var l = maybeLabel.a;
				return A2($elm$core$Dict$singleton, 'label', l);
			}
		};
		return A4(
			$elm_community$graph$Graph$DOT$outputWithStylesAndAttributes,
			styles,
			A2($elm$core$Basics$composeL, labelOnly, mapNode),
			A2($elm$core$Basics$composeL, labelOnly, mapEdge),
			graph);
	});
var $elm_community$graph$Graph$DOT$output = $elm_community$graph$Graph$DOT$outputWithStyles($elm_community$graph$Graph$DOT$defaultStyles);
var $author$project$Main$parentElemId = 'graph-parent';
var $author$project$Gen$Def$relToString = function (rel) {
	switch (rel.$) {
		case 'Father':
			return 'father';
		case 'Mother':
			return 'mother';
		case 'Child':
			return 'child';
		case 'AdoptFather':
			return 'adopt-father';
		case 'AdoptMother':
			return 'adopt-mother';
		default:
			return 'affection';
	}
};
var $author$project$Main$targetElemId = 'graph-target';
var $Chadtech$unique_list$List$Unique$UniqueList = function (a) {
	return {$: 'UniqueList', a: a};
};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $Chadtech$unique_list$List$Unique$consIfNotMember = F2(
	function (el, list) {
		return A2($elm$core$List$member, el, list) ? list : A2($elm$core$List$cons, el, list);
	});
var $Chadtech$unique_list$List$Unique$fromList = function (list) {
	return $Chadtech$unique_list$List$Unique$UniqueList(
		A3($elm$core$List$foldr, $Chadtech$unique_list$List$Unique$consIfNotMember, _List_Nil, list));
};
var $Chadtech$unique_list$List$Unique$toList = function (_v0) {
	var list = _v0.a;
	return list;
};
var $Chadtech$unique_list$List$Unique$filterDuplicates = A2($elm$core$Basics$composeR, $Chadtech$unique_list$List$Unique$fromList, $Chadtech$unique_list$List$Unique$toList);
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $author$project$Gen$Def$participantsOf = function (_v0) {
	var from = _v0.a;
	var to = _v0.c;
	return _Utils_Tuple2(from, to);
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Gen$Def$toGraph = function (_v0) {
	var facts = _v0.b;
	var uniquePersons = $Chadtech$unique_list$List$Unique$filterDuplicates(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, list) {
					var p1 = _v4.a;
					var p2 = _v4.b;
					return A2(
						$elm$core$List$cons,
						p1,
						A2($elm$core$List$cons, p2, list));
				}),
			_List_Nil,
			A2($elm$core$List$map, $author$project$Gen$Def$participantsOf, facts)));
	var toNode = function (_v3) {
		var idx = _v3.a;
		var person = _v3.b;
		return A2($elm_community$graph$Graph$Node, idx, person);
	};
	var indexedUniquePersons = A2($elm$core$List$indexedMap, $elm$core$Tuple$pair, uniquePersons);
	var indexOf = function (person) {
		return $elm$core$List$head(
			A2(
				$elm$core$List$filterMap,
				function (_v2) {
					var idx = _v2.a;
					var otherPerson = _v2.b;
					return _Utils_eq(otherPerson, person) ? $elm$core$Maybe$Just(idx) : $elm$core$Maybe$Nothing;
				},
				indexedUniquePersons));
	};
	var toEdge = function (_v1) {
		var personA = _v1.a;
		var rel = _v1.b;
		var personB = _v1.c;
		return A3(
			$elm_community$graph$Graph$Edge,
			A2(
				$elm$core$Maybe$withDefault,
				-1,
				indexOf(personA)),
			A2(
				$elm$core$Maybe$withDefault,
				-1,
				indexOf(personB)),
			rel);
	};
	return A2(
		$elm_community$graph$Graph$fromNodesAndEdges,
		A2($elm$core$List$map, toNode, indexedUniquePersons),
		A2($elm$core$List$map, toEdge, facts));
};
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $author$project$Main$viewGraph = _Platform_outgoingPort(
	'viewGraph',
	function ($) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'graphStr',
					$elm$json$Json$Encode$string($.graphStr)),
					_Utils_Tuple2(
					'parentEl',
					$elm$json$Json$Encode$string($.parentEl)),
					_Utils_Tuple2(
					'targetEl',
					$elm$json$Json$Encode$string($.targetEl))
				]));
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'ToGenealogy':
				var world = msg.a;
				var graph = $author$project$Gen$Def$toGraph(
					function () {
						switch (world.$) {
							case 'Adam':
								return $author$project$Gen$Tree$adam;
							case 'Eva':
								return $author$project$Gen$Tree$eva;
							case 'Origin_1':
								return $author$project$Gen$Tree$origin;
							default:
								return $author$project$Gen$Tree$origin;
						}
					}());
				return _Utils_Tuple2(
					$author$project$Main$Genealogy(graph),
					$author$project$Main$viewGraph(
						{
							graphStr: A3(
								$elm_community$graph$Graph$DOT$output,
								A2($elm$core$Basics$composeL, $elm$core$Maybe$Just, $author$project$Person$codename),
								A2($elm$core$Basics$composeL, $elm$core$Maybe$Just, $author$project$Gen$Def$relToString),
								graph),
							parentEl: $author$project$Main$parentElemId,
							targetEl: $author$project$Main$targetElemId
						}));
			case 'ToTimeline':
				return _Utils_Tuple2(
					$author$project$Main$Timeline(
						A2($elm_community$graph$Graph$fromNodeLabelsAndEdgePairs, $author$project$Timeline$timeline, _List_Nil)),
					$elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Render$Plot$ByDate = function (a) {
	return {$: 'ByDate', a: a};
};
var $author$project$Render$Plot$ByWorld = function (a) {
	return {$: 'ByWorld', a: a};
};
var $author$project$Main$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $author$project$Main$ToGenealogy = function (a) {
	return {$: 'ToGenealogy', a: a};
};
var $author$project$Main$ToTimeline = {$: 'ToTimeline'};
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$html$Html$map = $elm$virtual_dom$VirtualDom$map;
var $author$project$Render$Plot$noFilter = $elm$core$Basics$always(true);
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Render$Plot$All = {$: 'All'};
var $author$project$Render$Plot$ByPerson = function (a) {
	return {$: 'ByPerson', a: a};
};
var $author$project$Render$Plot$BySeason = function (a) {
	return {$: 'BySeason', a: a};
};
var $author$project$Render$Plot$XAll = function (a) {
	return {$: 'XAll', a: a};
};
var $author$project$Render$Plot$XByDate = function (a) {
	return {$: 'XByDate', a: a};
};
var $author$project$Render$Plot$XByPerson = function (a) {
	return {$: 'XByPerson', a: a};
};
var $author$project$Render$Plot$XBySeason = function (a) {
	return {$: 'XBySeason', a: a};
};
var $author$project$Render$Plot$XByWorld = function (a) {
	return {$: 'XByWorld', a: a};
};
var $author$project$Render$Plot$XNone = {$: 'XNone'};
var $author$project$Render$Plot$YAll = function (a) {
	return {$: 'YAll', a: a};
};
var $author$project$Render$Plot$YByDate = function (a) {
	return {$: 'YByDate', a: a};
};
var $author$project$Render$Plot$YByPerson = function (a) {
	return {$: 'YByPerson', a: a};
};
var $author$project$Render$Plot$YBySeason = function (a) {
	return {$: 'YBySeason', a: a};
};
var $author$project$Render$Plot$YByWorld = function (a) {
	return {$: 'YByWorld', a: a};
};
var $author$project$Event$getDay = function (date) {
	switch (date.$) {
		case 'Exact':
			var _v1 = date.a;
			var d = _v1.a;
			return $elm$core$Maybe$Just(d);
		case 'Someday':
			return $elm$core$Maybe$Nothing;
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Event$getMonth = function (date) {
	switch (date.$) {
		case 'Exact':
			var _v1 = date.a;
			var m = _v1.b;
			return $elm$core$Maybe$Just(m);
		case 'Someday':
			var m = date.a;
			return $elm$core$Maybe$Just(m);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Event$getYear = function (date) {
	switch (date.$) {
		case 'Exact':
			var _v1 = date.a;
			var y = _v1.c;
			return y;
		case 'Someday':
			var y = date.b;
			return y;
		default:
			var y = date.a;
			return y;
	}
};
var $elm$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _v0) {
				var trues = _v0.a;
				var falses = _v0.b;
				return pred(x) ? _Utils_Tuple2(
					A2($elm$core$List$cons, x, trues),
					falses) : _Utils_Tuple2(
					trues,
					A2($elm$core$List$cons, x, falses));
			});
		return A3(
			$elm$core$List$foldr,
			step,
			_Utils_Tuple2(_List_Nil, _List_Nil),
			list);
	});
var $elm_community$list_extra$List$Extra$gatherWith = F2(
	function (testFn, list) {
		var helper = F2(
			function (scattered, gathered) {
				if (!scattered.b) {
					return $elm$core$List$reverse(gathered);
				} else {
					var toGather = scattered.a;
					var population = scattered.b;
					var _v1 = A2(
						$elm$core$List$partition,
						testFn(toGather),
						population);
					var gathering = _v1.a;
					var remaining = _v1.b;
					return A2(
						helper,
						remaining,
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(toGather, gathering),
							gathered));
				}
			});
		return A2(helper, list, _List_Nil);
	});
var $author$project$Render$Util$groupBy = F2(
	function (comparator, convert) {
		return A2(
			$elm$core$Basics$composeR,
			$elm_community$list_extra$List$Extra$gatherWith(comparator),
			$elm$core$List$map(
				function (_v0) {
					var head = _v0.a;
					var tail = _v0.b;
					return _Utils_Tuple2(
						convert(head),
						A2($elm$core$List$cons, head, tail));
				}));
	});
var $author$project$Render$Util$groupBy1 = F2(
	function (comparator, convert) {
		return A2(
			$author$project$Render$Util$groupBy,
			F2(
				function (a, b) {
					return A2(
						comparator,
						convert(a),
						convert(b));
				}),
			convert);
	});
var $author$project$Render$Util$groupByEquals1 = $author$project$Render$Util$groupBy1($elm$core$Basics$eq);
var $author$project$Render$Util$flip = function (_v0) {
	var a = _v0.a;
	var b = _v0.b;
	return _Utils_Tuple2(b, a);
};
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $author$project$Render$Util$groupSplitBy = F2(
	function (comparator, convertToMaybe) {
		return A2(
			$elm$core$Basics$composeR,
			$elm$core$List$partition(
				function (a) {
					var _v0 = convertToMaybe(a);
					if (_v0.$ === 'Just') {
						return true;
					} else {
						return false;
					}
				}),
			A2(
				$elm$core$Basics$composeR,
				$author$project$Render$Util$flip,
				$elm$core$Tuple$mapSecond(
					A2(
						$elm$core$Basics$composeR,
						A2($author$project$Render$Util$groupBy, comparator, convertToMaybe),
						$elm$core$List$filterMap(
							function (_v1) {
								var maybeMarker = _v1.a;
								var item = _v1.b;
								if (maybeMarker.$ === 'Just') {
									var marker = maybeMarker.a;
									return $elm$core$Maybe$Just(
										_Utils_Tuple2(marker, item));
								} else {
									return $elm$core$Maybe$Nothing;
								}
							})))));
	});
var $author$project$Render$Util$mapSecondToTuple = F2(
	function (f, _v0) {
		var a = _v0.a;
		var b = _v0.b;
		var _v1 = f(b);
		var c = _v1.a;
		var d = _v1.b;
		return _Utils_Tuple3(a, c, d);
	});
var $justinmimbs$date$Date$RD = function (a) {
	return {$: 'RD', a: a};
};
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $elm$core$Basics$modBy = _Basics_modBy;
var $justinmimbs$date$Date$isLeapYear = function (y) {
	return ((!A2($elm$core$Basics$modBy, 4, y)) && (!(!A2($elm$core$Basics$modBy, 100, y)))) || (!A2($elm$core$Basics$modBy, 400, y));
};
var $justinmimbs$date$Date$daysBeforeMonth = F2(
	function (y, m) {
		var leapDays = $justinmimbs$date$Date$isLeapYear(y) ? 1 : 0;
		switch (m.$) {
			case 'Jan':
				return 0;
			case 'Feb':
				return 31;
			case 'Mar':
				return 59 + leapDays;
			case 'Apr':
				return 90 + leapDays;
			case 'May':
				return 120 + leapDays;
			case 'Jun':
				return 151 + leapDays;
			case 'Jul':
				return 181 + leapDays;
			case 'Aug':
				return 212 + leapDays;
			case 'Sep':
				return 243 + leapDays;
			case 'Oct':
				return 273 + leapDays;
			case 'Nov':
				return 304 + leapDays;
			default:
				return 334 + leapDays;
		}
	});
var $justinmimbs$date$Date$floorDiv = F2(
	function (a, b) {
		return $elm$core$Basics$floor(a / b);
	});
var $justinmimbs$date$Date$daysBeforeYear = function (y1) {
	var y = y1 - 1;
	var leapYears = (A2($justinmimbs$date$Date$floorDiv, y, 4) - A2($justinmimbs$date$Date$floorDiv, y, 100)) + A2($justinmimbs$date$Date$floorDiv, y, 400);
	return (365 * y) + leapYears;
};
var $justinmimbs$date$Date$daysInMonth = F2(
	function (y, m) {
		switch (m.$) {
			case 'Jan':
				return 31;
			case 'Feb':
				return $justinmimbs$date$Date$isLeapYear(y) ? 29 : 28;
			case 'Mar':
				return 31;
			case 'Apr':
				return 30;
			case 'May':
				return 31;
			case 'Jun':
				return 30;
			case 'Jul':
				return 31;
			case 'Aug':
				return 31;
			case 'Sep':
				return 30;
			case 'Oct':
				return 31;
			case 'Nov':
				return 30;
			default:
				return 31;
		}
	});
var $justinmimbs$date$Date$fromCalendarDate = F3(
	function (y, m, d) {
		return $justinmimbs$date$Date$RD(
			($justinmimbs$date$Date$daysBeforeYear(y) + A2($justinmimbs$date$Date$daysBeforeMonth, y, m)) + A3(
				$elm$core$Basics$clamp,
				1,
				A2($justinmimbs$date$Date$daysInMonth, y, m),
				d));
	});
var $justinmimbs$date$Date$toRataDie = function (_v0) {
	var rd = _v0.a;
	return rd;
};
var $author$project$Event$onSameDay = F2(
	function (dateA, dateB) {
		var _v0 = _Utils_Tuple2(dateA, dateB);
		_v0$3:
		while (true) {
			switch (_v0.a.$) {
				case 'Exact':
					if (_v0.b.$ === 'Exact') {
						var _v1 = _v0.a.a;
						var dA = _v1.a;
						var mA = _v1.b;
						var yA = _v1.c;
						var _v2 = _v0.b.a;
						var dB = _v2.a;
						var mB = _v2.b;
						var yB = _v2.c;
						return _Utils_eq(
							$justinmimbs$date$Date$toRataDie(
								A3($justinmimbs$date$Date$fromCalendarDate, yA, mA, dA)),
							$justinmimbs$date$Date$toRataDie(
								A3($justinmimbs$date$Date$fromCalendarDate, yB, mB, dB)));
					} else {
						break _v0$3;
					}
				case 'Someday':
					if (_v0.b.$ === 'Someday') {
						var _v3 = _v0.a;
						var mA = _v3.a;
						var yA = _v3.b;
						var _v4 = _v0.b;
						var mB = _v4.a;
						var yB = _v4.b;
						return _Utils_eq(mA, mB) && _Utils_eq(yA, yB);
					} else {
						break _v0$3;
					}
				default:
					if (_v0.b.$ === 'Throughout') {
						var yA = _v0.a.a;
						var yB = _v0.b.a;
						return _Utils_eq(yA, yB);
					} else {
						break _v0$3;
					}
			}
		}
		return false;
	});
var $author$project$Event$onSameMonth = F2(
	function (dateA, dateB) {
		var _v0 = _Utils_Tuple2(dateA, dateB);
		_v0$5:
		while (true) {
			switch (_v0.a.$) {
				case 'Throughout':
					if (_v0.b.$ === 'Throughout') {
						var yA = _v0.a.a;
						var yB = _v0.b.a;
						return _Utils_eq(yA, yB);
					} else {
						break _v0$5;
					}
				case 'Exact':
					switch (_v0.b.$) {
						case 'Exact':
							var _v1 = _v0.a.a;
							var mA = _v1.b;
							var yA = _v1.c;
							var _v2 = _v0.b.a;
							var mB = _v2.b;
							var yB = _v2.c;
							return _Utils_eq(
								$justinmimbs$date$Date$toRataDie(
									A3($justinmimbs$date$Date$fromCalendarDate, yA, mA, 1)),
								$justinmimbs$date$Date$toRataDie(
									A3($justinmimbs$date$Date$fromCalendarDate, yB, mB, 1)));
						case 'Someday':
							var _v5 = _v0.a.a;
							var mA = _v5.b;
							var yA = _v5.c;
							var _v6 = _v0.b;
							var mB = _v6.a;
							var yB = _v6.b;
							return _Utils_eq(mA, mB) && _Utils_eq(yA, yB);
						default:
							break _v0$5;
					}
				default:
					switch (_v0.b.$) {
						case 'Someday':
							var _v3 = _v0.a;
							var mA = _v3.a;
							var yA = _v3.b;
							var _v4 = _v0.b;
							var mB = _v4.a;
							var yB = _v4.b;
							return _Utils_eq(mA, mB) && _Utils_eq(yA, yB);
						case 'Exact':
							var _v7 = _v0.a;
							var mA = _v7.a;
							var yA = _v7.b;
							var _v8 = _v0.b.a;
							var mB = _v8.b;
							var yB = _v8.c;
							return _Utils_eq(mA, mB) && _Utils_eq(yA, yB);
						default:
							break _v0$5;
					}
			}
		}
		return false;
	});
var $author$project$Render$Plot$arrangeByDate = function (extractDate) {
	var equalMonths = F2(
		function (a, b) {
			return A2(
				$author$project$Event$onSameMonth,
				extractDate(a),
				extractDate(b));
		});
	var equalDays = F2(
		function (a, b) {
			return A2(
				$author$project$Event$onSameDay,
				extractDate(a),
				extractDate(b));
		});
	return A2(
		$elm$core$Basics$composeR,
		$author$project$Render$Util$groupByEquals1(
			A2($elm$core$Basics$composeR, extractDate, $author$project$Event$getYear)),
		$elm$core$List$map(
			$author$project$Render$Util$mapSecondToTuple(
				A2(
					$elm$core$Basics$composeR,
					A2(
						$author$project$Render$Util$groupSplitBy,
						equalMonths,
						A2($elm$core$Basics$composeR, extractDate, $author$project$Event$getMonth)),
					$elm$core$Tuple$mapSecond(
						$elm$core$List$map(
							$author$project$Render$Util$mapSecondToTuple(
								A2(
									$author$project$Render$Util$groupSplitBy,
									equalDays,
									A2($elm$core$Basics$composeR, extractDate, $author$project$Event$getDay)))))))));
};
var $author$project$Person$Tannhaus = {$: 'Tannhaus'};
var $author$project$Person$familyOf = function (_v0) {
	return $author$project$Person$Tannhaus;
};
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$core$Tuple$mapBoth = F3(
	function (funcA, funcB, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			funcA(x),
			funcB(y));
	});
var $author$project$Render$Util$participants = F2(
	function (toComparable, extract) {
		return A2(
			$elm$core$Basics$composeR,
			$elm$core$List$concatMap(
				function (item) {
					return A2(
						$elm$core$List$map,
						function (marker) {
							return _Utils_Tuple2(
								_Utils_Tuple2(
									toComparable(marker),
									marker),
								item);
						},
						extract(item));
				}),
			A2(
				$elm$core$Basics$composeR,
				A2(
					$author$project$Render$Util$groupBy1,
					F2(
						function (a, b) {
							return _Utils_eq(a.a, b.a);
						}),
					$elm$core$Tuple$first),
				$elm$core$List$map(
					A2(
						$elm$core$Tuple$mapBoth,
						$elm$core$Tuple$second,
						$elm$core$List$map($elm$core$Tuple$second)))));
	});
var $author$project$Render$Plot$arrangeByPerson = function (extractPersons) {
	return A2(
		$elm$core$Basics$composeR,
		A2($author$project$Render$Util$participants, $author$project$Person$codename, extractPersons),
		$author$project$Render$Util$groupByEquals1(
			A2($elm$core$Basics$composeR, $elm$core$Tuple$first, $author$project$Person$familyOf)));
};
var $author$project$Render$Plot$arrangeBySeason = function (extractEpisode) {
	var extractSeason = A2($elm$core$Basics$composeR, extractEpisode, $elm$core$Tuple$first);
	var equalEpisodes = F2(
		function (a, b) {
			var _v0 = _Utils_Tuple2(
				extractEpisode(a),
				extractEpisode(b));
			if ((_v0.a.b.$ === 'Just') && (_v0.b.b.$ === 'Just')) {
				var _v1 = _v0.a;
				var sA = _v1.a.a;
				var eA = _v1.b.a.a;
				var _v2 = _v0.b;
				var sB = _v2.a.a;
				var eB = _v2.b.a.a;
				return _Utils_eq(sA, sB) && _Utils_eq(eA, eB);
			} else {
				return false;
			}
		});
	return A2(
		$elm$core$Basics$composeR,
		$author$project$Render$Util$groupByEquals1(extractSeason),
		$elm$core$List$map(
			$author$project$Render$Util$mapSecondToTuple(
				A2(
					$author$project$Render$Util$groupSplitBy,
					equalEpisodes,
					A2($elm$core$Basics$composeR, extractEpisode, $elm$core$Tuple$second)))));
};
var $author$project$Render$Plot$arrangeByWorld = $author$project$Render$Util$groupByEquals1;
var $author$project$Event$getPersons = function (event) {
	return A2(
		$elm$core$List$map,
		function (_v0) {
			var personId = _v0.a;
			return personId;
		},
		event.participants);
};
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $elm_community$intdict$IntDict$keys = function (dict) {
	return A3(
		$elm_community$intdict$IntDict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm_community$graph$Graph$alongOutgoingEdges = function (ctx) {
	return $elm_community$intdict$IntDict$keys(ctx.outgoing);
};
var $elm_community$graph$Graph$get = function (nodeId) {
	return A2(
		$elm$core$Basics$composeR,
		$elm_community$graph$Graph$unGraph,
		$elm_community$intdict$IntDict$get(nodeId));
};
var $elm_community$graph$Graph$applyEdgeDiff = F3(
	function (nodeId, diff, graphRep) {
		var updateOutgoingEdge = F2(
			function (upd, node) {
				return _Utils_update(
					node,
					{
						outgoing: A3($elm_community$intdict$IntDict$update, nodeId, upd, node.outgoing)
					});
			});
		var updateIncomingEdge = F2(
			function (upd, node) {
				return _Utils_update(
					node,
					{
						incoming: A3($elm_community$intdict$IntDict$update, nodeId, upd, node.incoming)
					});
			});
		var flippedFoldl = F3(
			function (f, dict, acc) {
				return A3($elm_community$intdict$IntDict$foldl, f, acc, dict);
			});
		var edgeUpdateToMaybe = function (edgeUpdate) {
			if (edgeUpdate.$ === 'Insert') {
				var lbl = edgeUpdate.a;
				return $elm$core$Maybe$Just(lbl);
			} else {
				return $elm$core$Maybe$Nothing;
			}
		};
		var updateAdjacency = F3(
			function (updateEdge, updatedId, edgeUpdate) {
				var updateLbl = updateEdge(
					$elm$core$Basics$always(
						edgeUpdateToMaybe(edgeUpdate)));
				return A2(
					$elm_community$intdict$IntDict$update,
					updatedId,
					$elm$core$Maybe$map(updateLbl));
			});
		return A3(
			flippedFoldl,
			updateAdjacency(updateOutgoingEdge),
			diff.outgoing,
			A3(
				flippedFoldl,
				updateAdjacency(updateIncomingEdge),
				diff.incoming,
				graphRep));
	});
var $elm_community$graph$Graph$Insert = function (a) {
	return {$: 'Insert', a: a};
};
var $elm_community$graph$Graph$Remove = function (a) {
	return {$: 'Remove', a: a};
};
var $elm_community$graph$Graph$crashHack = function (msg) {
	crashHack:
	while (true) {
		var $temp$msg = msg;
		msg = $temp$msg;
		continue crashHack;
	}
};
var $elm_community$graph$Graph$emptyDiff = {incoming: $elm_community$intdict$IntDict$empty, outgoing: $elm_community$intdict$IntDict$empty};
var $elm_community$graph$Graph$computeEdgeDiff = F2(
	function (old, _new) {
		var collectUpdates = F3(
			function (edgeUpdate, updatedId, label) {
				var replaceUpdate = function (old_) {
					var _v5 = _Utils_Tuple2(
						old_,
						edgeUpdate(label));
					if (_v5.a.$ === 'Just') {
						if (_v5.a.a.$ === 'Remove') {
							if (_v5.b.$ === 'Insert') {
								var oldLbl = _v5.a.a.a;
								var newLbl = _v5.b.a;
								return _Utils_eq(oldLbl, newLbl) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
									$elm_community$graph$Graph$Insert(newLbl));
							} else {
								return $elm_community$graph$Graph$crashHack('Graph.computeEdgeDiff: Collected two removals for the same edge. This is an error in the implementation of Graph and you should file a bug report!');
							}
						} else {
							return $elm_community$graph$Graph$crashHack('Graph.computeEdgeDiff: Collected inserts before removals. This is an error in the implementation of Graph and you should file a bug report!');
						}
					} else {
						var _v6 = _v5.a;
						var eu = _v5.b;
						return $elm$core$Maybe$Just(eu);
					}
				};
				return A2($elm_community$intdict$IntDict$update, updatedId, replaceUpdate);
			});
		var collect = F3(
			function (edgeUpdate, adj, updates) {
				return A3(
					$elm_community$intdict$IntDict$foldl,
					collectUpdates(edgeUpdate),
					updates,
					adj);
			});
		var _v0 = _Utils_Tuple2(old, _new);
		if (_v0.a.$ === 'Nothing') {
			if (_v0.b.$ === 'Nothing') {
				var _v1 = _v0.a;
				var _v2 = _v0.b;
				return $elm_community$graph$Graph$emptyDiff;
			} else {
				var _v4 = _v0.a;
				var ins = _v0.b.a;
				return {
					incoming: A3(collect, $elm_community$graph$Graph$Insert, ins.outgoing, $elm_community$intdict$IntDict$empty),
					outgoing: A3(collect, $elm_community$graph$Graph$Insert, ins.incoming, $elm_community$intdict$IntDict$empty)
				};
			}
		} else {
			if (_v0.b.$ === 'Nothing') {
				var rem = _v0.a.a;
				var _v3 = _v0.b;
				return {
					incoming: A3(collect, $elm_community$graph$Graph$Remove, rem.outgoing, $elm_community$intdict$IntDict$empty),
					outgoing: A3(collect, $elm_community$graph$Graph$Remove, rem.incoming, $elm_community$intdict$IntDict$empty)
				};
			} else {
				var rem = _v0.a.a;
				var ins = _v0.b.a;
				return _Utils_eq(rem, ins) ? $elm_community$graph$Graph$emptyDiff : {
					incoming: A3(
						collect,
						$elm_community$graph$Graph$Insert,
						ins.outgoing,
						A3(collect, $elm_community$graph$Graph$Remove, rem.outgoing, $elm_community$intdict$IntDict$empty)),
					outgoing: A3(
						collect,
						$elm_community$graph$Graph$Insert,
						ins.incoming,
						A3(collect, $elm_community$graph$Graph$Remove, rem.incoming, $elm_community$intdict$IntDict$empty))
				};
			}
		}
	});
var $elm_community$intdict$IntDict$filter = F2(
	function (predicate, dict) {
		var add = F3(
			function (k, v, d) {
				return A2(predicate, k, v) ? A3($elm_community$intdict$IntDict$insert, k, v, d) : d;
			});
		return A3($elm_community$intdict$IntDict$foldl, add, $elm_community$intdict$IntDict$empty, dict);
	});
var $elm_community$graph$Graph$update = F2(
	function (nodeId, updater) {
		var wrappedUpdater = function (rep) {
			var old = A2($elm_community$intdict$IntDict$get, nodeId, rep);
			var filterInvalidEdges = function (ctx) {
				return $elm_community$intdict$IntDict$filter(
					F2(
						function (id, _v0) {
							return _Utils_eq(id, ctx.node.id) || A2($elm_community$intdict$IntDict$member, id, rep);
						}));
			};
			var cleanUpEdges = function (ctx) {
				return _Utils_update(
					ctx,
					{
						incoming: A2(filterInvalidEdges, ctx, ctx.incoming),
						outgoing: A2(filterInvalidEdges, ctx, ctx.outgoing)
					});
			};
			var _new = A2(
				$elm$core$Maybe$map,
				cleanUpEdges,
				updater(old));
			var diff = A2($elm_community$graph$Graph$computeEdgeDiff, old, _new);
			return A3(
				$elm_community$intdict$IntDict$update,
				nodeId,
				$elm$core$Basics$always(_new),
				A3($elm_community$graph$Graph$applyEdgeDiff, nodeId, diff, rep));
		};
		return A2(
			$elm$core$Basics$composeR,
			$elm_community$graph$Graph$unGraph,
			A2($elm$core$Basics$composeR, wrappedUpdater, $elm_community$graph$Graph$Graph));
	});
var $elm_community$graph$Graph$remove = F2(
	function (nodeId, graph) {
		return A3(
			$elm_community$graph$Graph$update,
			nodeId,
			$elm$core$Basics$always($elm$core$Maybe$Nothing),
			graph);
	});
var $elm_community$graph$Graph$guidedDfs = F5(
	function (selectNeighbors, visitNode, startingSeeds, startingAcc, startingGraph) {
		var go = F3(
			function (seeds, acc, graph) {
				go:
				while (true) {
					if (!seeds.b) {
						return _Utils_Tuple2(acc, graph);
					} else {
						var next = seeds.a;
						var seeds1 = seeds.b;
						var _v1 = A2($elm_community$graph$Graph$get, next, graph);
						if (_v1.$ === 'Nothing') {
							var $temp$seeds = seeds1,
								$temp$acc = acc,
								$temp$graph = graph;
							seeds = $temp$seeds;
							acc = $temp$acc;
							graph = $temp$graph;
							continue go;
						} else {
							var ctx = _v1.a;
							var _v2 = A2(visitNode, ctx, acc);
							var accAfterDiscovery = _v2.a;
							var finishNode = _v2.b;
							var _v3 = A3(
								go,
								selectNeighbors(ctx),
								accAfterDiscovery,
								A2($elm_community$graph$Graph$remove, next, graph));
							var accBeforeFinish = _v3.a;
							var graph1 = _v3.b;
							var accAfterFinish = finishNode(accBeforeFinish);
							var $temp$seeds = seeds1,
								$temp$acc = accAfterFinish,
								$temp$graph = graph1;
							seeds = $temp$seeds;
							acc = $temp$acc;
							graph = $temp$graph;
							continue go;
						}
					}
				}
			});
		return A3(go, startingSeeds, startingAcc, startingGraph);
	});
var $elm_community$graph$Graph$nodeIds = A2($elm$core$Basics$composeR, $elm_community$graph$Graph$unGraph, $elm_community$intdict$IntDict$keys);
var $elm_community$graph$Graph$dfs = F3(
	function (visitNode, acc, graph) {
		return A5(
			$elm_community$graph$Graph$guidedDfs,
			$elm_community$graph$Graph$alongOutgoingEdges,
			visitNode,
			$elm_community$graph$Graph$nodeIds(graph),
			acc,
			graph).a;
	});
var $elm_community$graph$Graph$onDiscovery = F3(
	function (visitor, ctx, acc) {
		return _Utils_Tuple2(
			A2(visitor, ctx, acc),
			$elm$core$Basics$identity);
	});
var $author$project$Render$Plot$toEventList = A2(
	$elm$core$Basics$composeR,
	A2(
		$elm_community$graph$Graph$dfs,
		$elm_community$graph$Graph$onDiscovery($elm$core$List$cons),
		_List_Nil),
	A2(
		$elm$core$Basics$composeR,
		$elm$core$List$reverse,
		$elm$core$List$map(
			A2(
				$elm$core$Basics$composeL,
				function ($) {
					return $.label;
				},
				function ($) {
					return $.node;
				}))));
var $author$project$Render$Plot$plot = F2(
	function (_v0, graph) {
		plot:
		while (true) {
			var x = _v0.x;
			var y = _v0.y;
			var toWorlds = function (f) {
				return $elm$core$List$map(
					$elm$core$Tuple$mapSecond(
						A2($elm$core$Basics$composeL, $elm$core$List$singleton, f)));
			};
			var toSeasons = function (f) {
				return $elm$core$List$map(
					function (_v16) {
						var season = _v16.a;
						var seasonItems = _v16.b;
						var episodes = _v16.c;
						return _Utils_Tuple3(
							season,
							$elm$core$List$singleton(
								f(seasonItems)),
							A2(
								$elm$core$List$map,
								$elm$core$Tuple$mapSecond(
									A2($elm$core$Basics$composeL, $elm$core$List$singleton, f)),
								episodes));
					});
			};
			var toPersons = function (f) {
				return $elm$core$List$map(
					$elm$core$Tuple$mapSecond(
						$elm$core$List$map(
							$elm$core$Tuple$mapSecond(
								A2($elm$core$Basics$composeL, $elm$core$List$singleton, f)))));
			};
			var toDates = function (f) {
				return $elm$core$List$map(
					function (_v14) {
						var year = _v14.a;
						var yearItems = _v14.b;
						var months = _v14.c;
						return _Utils_Tuple3(
							year,
							$elm$core$List$singleton(
								f(yearItems)),
							A2(
								$elm$core$List$map,
								function (_v15) {
									var month = _v15.a;
									var monthItems = _v15.b;
									var dates = _v15.c;
									return _Utils_Tuple3(
										month,
										$elm$core$List$singleton(
											f(monthItems)),
										A2(
											$elm$core$List$map,
											$elm$core$Tuple$mapSecond(
												A2($elm$core$Basics$composeL, $elm$core$List$singleton, f)),
											dates));
								},
								months));
					});
			};
			var eventList = $author$project$Render$Plot$toEventList(graph);
			var _v1 = _Utils_Tuple2(x, y);
			_v1$1:
			while (true) {
				switch (_v1.a.$) {
					case 'None':
						var _v2 = _v1.a;
						return $author$project$Render$Plot$XNone;
					case 'All':
						switch (_v1.b.$) {
							case 'None':
								break _v1$1;
							case 'All':
								var _v4 = _v1.a;
								var _v5 = _v1.b;
								return $author$project$Render$Plot$XAll(
									$author$project$Render$Plot$YAll(eventList));
							case 'ByDate':
								var _v6 = _v1.a;
								return $author$project$Render$Plot$XAll(
									$author$project$Render$Plot$YByDate(
										A2(
											$author$project$Render$Plot$arrangeByDate,
											function ($) {
												return $.date;
											},
											eventList)));
							case 'ByPerson':
								var _v7 = _v1.a;
								return $author$project$Render$Plot$XAll(
									$author$project$Render$Plot$YByPerson(
										A2($author$project$Render$Plot$arrangeByPerson, $author$project$Event$getPersons, eventList)));
							case 'BySeason':
								var _v8 = _v1.a;
								return $author$project$Render$Plot$XAll(
									$author$project$Render$Plot$YBySeason(
										A2(
											$author$project$Render$Plot$arrangeBySeason,
											function ($) {
												return $.episode;
											},
											eventList)));
							default:
								var _v9 = _v1.a;
								return $author$project$Render$Plot$XAll(
									$author$project$Render$Plot$YByWorld(
										A2(
											$author$project$Render$Plot$arrangeByWorld,
											function ($) {
												return $.world;
											},
											eventList)));
						}
					case 'ByDate':
						switch (_v1.b.$) {
							case 'None':
								break _v1$1;
							case 'All':
								var _v10 = _v1.b;
								return $author$project$Render$Plot$XByDate(
									A2(
										toDates,
										$author$project$Render$Plot$YAll,
										A2(
											$author$project$Render$Plot$arrangeByDate,
											function ($) {
												return $.date;
											},
											eventList)));
							case 'ByDate':
								var filter = _v1.b.a;
								var $temp$_v0 = {
									x: $author$project$Render$Plot$All,
									y: $author$project$Render$Plot$ByDate(filter)
								},
									$temp$graph = graph;
								_v0 = $temp$_v0;
								graph = $temp$graph;
								continue plot;
							case 'ByPerson':
								return $author$project$Render$Plot$XByDate(
									A2(
										toDates,
										A2(
											$elm$core$Basics$composeL,
											$author$project$Render$Plot$YByPerson,
											$author$project$Render$Plot$arrangeByPerson($author$project$Event$getPersons)),
										A2(
											$author$project$Render$Plot$arrangeByDate,
											function ($) {
												return $.date;
											},
											eventList)));
							case 'BySeason':
								return $author$project$Render$Plot$XByDate(
									A2(
										toDates,
										A2(
											$elm$core$Basics$composeL,
											$author$project$Render$Plot$YBySeason,
											$author$project$Render$Plot$arrangeBySeason(
												function ($) {
													return $.episode;
												})),
										A2(
											$author$project$Render$Plot$arrangeByDate,
											function ($) {
												return $.date;
											},
											eventList)));
							default:
								return $author$project$Render$Plot$XByDate(
									A2(
										toDates,
										A2(
											$elm$core$Basics$composeL,
											$author$project$Render$Plot$YByWorld,
											$author$project$Render$Plot$arrangeByWorld(
												function ($) {
													return $.world;
												})),
										A2(
											$author$project$Render$Plot$arrangeByDate,
											function ($) {
												return $.date;
											},
											eventList)));
						}
					case 'ByPerson':
						switch (_v1.b.$) {
							case 'None':
								break _v1$1;
							case 'All':
								var _v11 = _v1.b;
								return $author$project$Render$Plot$XByPerson(
									A2(
										toPersons,
										$author$project$Render$Plot$YAll,
										A2($author$project$Render$Plot$arrangeByPerson, $author$project$Event$getPersons, eventList)));
							case 'ByDate':
								return $author$project$Render$Plot$XByPerson(
									A2(
										toPersons,
										A2(
											$elm$core$Basics$composeL,
											$author$project$Render$Plot$YByDate,
											$author$project$Render$Plot$arrangeByDate(
												function ($) {
													return $.date;
												})),
										A2($author$project$Render$Plot$arrangeByPerson, $author$project$Event$getPersons, eventList)));
							case 'ByPerson':
								var filter = _v1.b.a;
								var $temp$_v0 = {
									x: $author$project$Render$Plot$All,
									y: $author$project$Render$Plot$ByPerson(filter)
								},
									$temp$graph = graph;
								_v0 = $temp$_v0;
								graph = $temp$graph;
								continue plot;
							case 'BySeason':
								return $author$project$Render$Plot$XByPerson(
									A2(
										toPersons,
										A2(
											$elm$core$Basics$composeL,
											$author$project$Render$Plot$YBySeason,
											$author$project$Render$Plot$arrangeBySeason(
												function ($) {
													return $.episode;
												})),
										A2($author$project$Render$Plot$arrangeByPerson, $author$project$Event$getPersons, eventList)));
							default:
								return $author$project$Render$Plot$XByPerson(
									A2(
										toPersons,
										A2(
											$elm$core$Basics$composeL,
											$author$project$Render$Plot$YByWorld,
											$author$project$Render$Plot$arrangeByWorld(
												function ($) {
													return $.world;
												})),
										A2($author$project$Render$Plot$arrangeByPerson, $author$project$Event$getPersons, eventList)));
						}
					case 'BySeason':
						switch (_v1.b.$) {
							case 'None':
								break _v1$1;
							case 'All':
								var _v12 = _v1.b;
								return $author$project$Render$Plot$XBySeason(
									A2(
										toSeasons,
										$author$project$Render$Plot$YAll,
										A2(
											$author$project$Render$Plot$arrangeBySeason,
											function ($) {
												return $.episode;
											},
											eventList)));
							case 'ByDate':
								return $author$project$Render$Plot$XBySeason(
									A2(
										toSeasons,
										A2(
											$elm$core$Basics$composeL,
											$author$project$Render$Plot$YByDate,
											$author$project$Render$Plot$arrangeByDate(
												function ($) {
													return $.date;
												})),
										A2(
											$author$project$Render$Plot$arrangeBySeason,
											function ($) {
												return $.episode;
											},
											eventList)));
							case 'ByPerson':
								return $author$project$Render$Plot$XBySeason(
									A2(
										toSeasons,
										A2(
											$elm$core$Basics$composeL,
											$author$project$Render$Plot$YByPerson,
											$author$project$Render$Plot$arrangeByPerson($author$project$Event$getPersons)),
										A2(
											$author$project$Render$Plot$arrangeBySeason,
											function ($) {
												return $.episode;
											},
											eventList)));
							case 'BySeason':
								var filter = _v1.b.a;
								var $temp$_v0 = {
									x: $author$project$Render$Plot$All,
									y: $author$project$Render$Plot$BySeason(filter)
								},
									$temp$graph = graph;
								_v0 = $temp$_v0;
								graph = $temp$graph;
								continue plot;
							default:
								return $author$project$Render$Plot$XBySeason(
									A2(
										toSeasons,
										A2(
											$elm$core$Basics$composeL,
											$author$project$Render$Plot$YByWorld,
											$author$project$Render$Plot$arrangeByWorld(
												function ($) {
													return $.world;
												})),
										A2(
											$author$project$Render$Plot$arrangeBySeason,
											function ($) {
												return $.episode;
											},
											eventList)));
						}
					default:
						switch (_v1.b.$) {
							case 'None':
								break _v1$1;
							case 'All':
								var _v13 = _v1.b;
								return $author$project$Render$Plot$XByWorld(
									A2(
										toWorlds,
										$author$project$Render$Plot$YAll,
										A2(
											$author$project$Render$Plot$arrangeByWorld,
											function ($) {
												return $.world;
											},
											eventList)));
							case 'ByDate':
								return $author$project$Render$Plot$XByWorld(
									A2(
										toWorlds,
										A2(
											$elm$core$Basics$composeL,
											$author$project$Render$Plot$YByDate,
											$author$project$Render$Plot$arrangeByDate(
												function ($) {
													return $.date;
												})),
										A2(
											$author$project$Render$Plot$arrangeByWorld,
											function ($) {
												return $.world;
											},
											eventList)));
							case 'ByPerson':
								return $author$project$Render$Plot$XByWorld(
									A2(
										toWorlds,
										A2(
											$elm$core$Basics$composeL,
											$author$project$Render$Plot$YByPerson,
											$author$project$Render$Plot$arrangeByPerson($author$project$Event$getPersons)),
										A2(
											$author$project$Render$Plot$arrangeByWorld,
											function ($) {
												return $.world;
											},
											eventList)));
							case 'BySeason':
								return $author$project$Render$Plot$XByWorld(
									A2(
										toWorlds,
										A2(
											$elm$core$Basics$composeL,
											$author$project$Render$Plot$YBySeason,
											$author$project$Render$Plot$arrangeBySeason(
												function ($) {
													return $.episode;
												})),
										A2(
											$author$project$Render$Plot$arrangeByWorld,
											function ($) {
												return $.world;
											},
											eventList)));
							default:
								var filter = _v1.b.a;
								var $temp$_v0 = {
									x: $author$project$Render$Plot$All,
									y: $author$project$Render$Plot$ByWorld(filter)
								},
									$temp$graph = graph;
								_v0 = $temp$_v0;
								graph = $temp$graph;
								continue plot;
						}
				}
			}
			var _v3 = _v1.b;
			return $author$project$Render$Plot$XNone;
		}
	});
var $author$project$Render$Group$Horizontal = {$: 'Horizontal'};
var $author$project$Render$Group$Vertical = {$: 'Vertical'};
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $author$project$Render$Group$None = {$: 'None'};
var $author$project$Render$Group$Some_ = function (a) {
	return {$: 'Some_', a: a};
};
var $author$project$Render$Group$Nest = F2(
	function (a, b) {
		return {$: 'Nest', a: a, b: b};
	});
var $author$project$Render$Group$Nest_ = function (a) {
	return {$: 'Nest_', a: a};
};
var $author$project$Render$Group$Some = F2(
	function (a, b) {
		return {$: 'Some', a: a, b: b};
	});
var $elm$time$Time$Jan = {$: 'Jan'};
var $justinmimbs$date$Date$monthToNumber = function (m) {
	switch (m.$) {
		case 'Jan':
			return 1;
		case 'Feb':
			return 2;
		case 'Mar':
			return 3;
		case 'Apr':
			return 4;
		case 'May':
			return 5;
		case 'Jun':
			return 6;
		case 'Jul':
			return 7;
		case 'Aug':
			return 8;
		case 'Sep':
			return 9;
		case 'Oct':
			return 10;
		case 'Nov':
			return 11;
		default:
			return 12;
	}
};
var $elm$time$Time$Apr = {$: 'Apr'};
var $elm$time$Time$Dec = {$: 'Dec'};
var $elm$time$Time$Jul = {$: 'Jul'};
var $elm$time$Time$Mar = {$: 'Mar'};
var $elm$time$Time$May = {$: 'May'};
var $elm$time$Time$Oct = {$: 'Oct'};
var $justinmimbs$date$Date$numberToMonth = function (mn) {
	var _v0 = A2($elm$core$Basics$max, 1, mn);
	switch (_v0) {
		case 1:
			return $elm$time$Time$Jan;
		case 2:
			return $elm$time$Time$Feb;
		case 3:
			return $elm$time$Time$Mar;
		case 4:
			return $elm$time$Time$Apr;
		case 5:
			return $elm$time$Time$May;
		case 6:
			return $elm$time$Time$Jun;
		case 7:
			return $elm$time$Time$Jul;
		case 8:
			return $elm$time$Time$Aug;
		case 9:
			return $elm$time$Time$Sep;
		case 10:
			return $elm$time$Time$Oct;
		case 11:
			return $elm$time$Time$Nov;
		default:
			return $elm$time$Time$Dec;
	}
};
var $justinmimbs$date$Date$toCalendarDateHelp = F3(
	function (y, m, d) {
		toCalendarDateHelp:
		while (true) {
			var monthDays = A2($justinmimbs$date$Date$daysInMonth, y, m);
			var mn = $justinmimbs$date$Date$monthToNumber(m);
			if ((mn < 12) && (_Utils_cmp(d, monthDays) > 0)) {
				var $temp$y = y,
					$temp$m = $justinmimbs$date$Date$numberToMonth(mn + 1),
					$temp$d = d - monthDays;
				y = $temp$y;
				m = $temp$m;
				d = $temp$d;
				continue toCalendarDateHelp;
			} else {
				return {day: d, month: m, year: y};
			}
		}
	});
var $justinmimbs$date$Date$divWithRemainder = F2(
	function (a, b) {
		return _Utils_Tuple2(
			A2($justinmimbs$date$Date$floorDiv, a, b),
			A2($elm$core$Basics$modBy, b, a));
	});
var $justinmimbs$date$Date$year = function (_v0) {
	var rd = _v0.a;
	var _v1 = A2($justinmimbs$date$Date$divWithRemainder, rd, 146097);
	var n400 = _v1.a;
	var r400 = _v1.b;
	var _v2 = A2($justinmimbs$date$Date$divWithRemainder, r400, 36524);
	var n100 = _v2.a;
	var r100 = _v2.b;
	var _v3 = A2($justinmimbs$date$Date$divWithRemainder, r100, 1461);
	var n4 = _v3.a;
	var r4 = _v3.b;
	var _v4 = A2($justinmimbs$date$Date$divWithRemainder, r4, 365);
	var n1 = _v4.a;
	var r1 = _v4.b;
	var n = (!r1) ? 0 : 1;
	return ((((n400 * 400) + (n100 * 100)) + (n4 * 4)) + n1) + n;
};
var $justinmimbs$date$Date$toOrdinalDate = function (_v0) {
	var rd = _v0.a;
	var y = $justinmimbs$date$Date$year(
		$justinmimbs$date$Date$RD(rd));
	return {
		ordinalDay: rd - $justinmimbs$date$Date$daysBeforeYear(y),
		year: y
	};
};
var $justinmimbs$date$Date$toCalendarDate = function (_v0) {
	var rd = _v0.a;
	var date = $justinmimbs$date$Date$toOrdinalDate(
		$justinmimbs$date$Date$RD(rd));
	return A3($justinmimbs$date$Date$toCalendarDateHelp, date.year, $elm$time$Time$Jan, date.ordinalDay);
};
var $justinmimbs$date$Date$day = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toCalendarDate,
	function ($) {
		return $.day;
	});
var $justinmimbs$date$Date$month = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toCalendarDate,
	function ($) {
		return $.month;
	});
var $justinmimbs$date$Date$monthNumber = A2($elm$core$Basics$composeR, $justinmimbs$date$Date$month, $justinmimbs$date$Date$monthToNumber);
var $justinmimbs$date$Date$ordinalDay = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toOrdinalDate,
	function ($) {
		return $.ordinalDay;
	});
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)),
			string);
	});
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $justinmimbs$date$Date$padSignedInt = F2(
	function (length, _int) {
		return _Utils_ap(
			(_int < 0) ? '-' : '',
			A3(
				$elm$core$String$padLeft,
				length,
				_Utils_chr('0'),
				$elm$core$String$fromInt(
					$elm$core$Basics$abs(_int))));
	});
var $justinmimbs$date$Date$monthToQuarter = function (m) {
	return (($justinmimbs$date$Date$monthToNumber(m) + 2) / 3) | 0;
};
var $justinmimbs$date$Date$quarter = A2($elm$core$Basics$composeR, $justinmimbs$date$Date$month, $justinmimbs$date$Date$monthToQuarter);
var $elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			$elm$core$String$slice,
			-n,
			$elm$core$String$length(string),
			string);
	});
var $justinmimbs$date$Date$weekdayNumber = function (_v0) {
	var rd = _v0.a;
	var _v1 = A2($elm$core$Basics$modBy, 7, rd);
	if (!_v1) {
		return 7;
	} else {
		var n = _v1;
		return n;
	}
};
var $justinmimbs$date$Date$daysBeforeWeekYear = function (y) {
	var jan4 = $justinmimbs$date$Date$daysBeforeYear(y) + 4;
	return jan4 - $justinmimbs$date$Date$weekdayNumber(
		$justinmimbs$date$Date$RD(jan4));
};
var $elm$time$Time$Fri = {$: 'Fri'};
var $elm$time$Time$Mon = {$: 'Mon'};
var $elm$time$Time$Sat = {$: 'Sat'};
var $elm$time$Time$Sun = {$: 'Sun'};
var $elm$time$Time$Thu = {$: 'Thu'};
var $elm$time$Time$Tue = {$: 'Tue'};
var $elm$time$Time$Wed = {$: 'Wed'};
var $justinmimbs$date$Date$numberToWeekday = function (wdn) {
	var _v0 = A2($elm$core$Basics$max, 1, wdn);
	switch (_v0) {
		case 1:
			return $elm$time$Time$Mon;
		case 2:
			return $elm$time$Time$Tue;
		case 3:
			return $elm$time$Time$Wed;
		case 4:
			return $elm$time$Time$Thu;
		case 5:
			return $elm$time$Time$Fri;
		case 6:
			return $elm$time$Time$Sat;
		default:
			return $elm$time$Time$Sun;
	}
};
var $justinmimbs$date$Date$toWeekDate = function (_v0) {
	var rd = _v0.a;
	var wdn = $justinmimbs$date$Date$weekdayNumber(
		$justinmimbs$date$Date$RD(rd));
	var wy = $justinmimbs$date$Date$year(
		$justinmimbs$date$Date$RD(rd + (4 - wdn)));
	var week1Day1 = $justinmimbs$date$Date$daysBeforeWeekYear(wy) + 1;
	return {
		weekNumber: 1 + (((rd - week1Day1) / 7) | 0),
		weekYear: wy,
		weekday: $justinmimbs$date$Date$numberToWeekday(wdn)
	};
};
var $justinmimbs$date$Date$weekNumber = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toWeekDate,
	function ($) {
		return $.weekNumber;
	});
var $justinmimbs$date$Date$weekYear = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toWeekDate,
	function ($) {
		return $.weekYear;
	});
var $justinmimbs$date$Date$weekday = A2($elm$core$Basics$composeR, $justinmimbs$date$Date$weekdayNumber, $justinmimbs$date$Date$numberToWeekday);
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $justinmimbs$date$Date$ordinalSuffix = function (n) {
	var nn = A2($elm$core$Basics$modBy, 100, n);
	var _v0 = A2(
		$elm$core$Basics$min,
		(nn < 20) ? nn : A2($elm$core$Basics$modBy, 10, nn),
		4);
	switch (_v0) {
		case 1:
			return 'st';
		case 2:
			return 'nd';
		case 3:
			return 'rd';
		default:
			return 'th';
	}
};
var $justinmimbs$date$Date$withOrdinalSuffix = function (n) {
	return _Utils_ap(
		$elm$core$String$fromInt(n),
		$justinmimbs$date$Date$ordinalSuffix(n));
};
var $justinmimbs$date$Date$formatField = F4(
	function (language, _char, length, date) {
		switch (_char.valueOf()) {
			case 'y':
				if (length === 2) {
					return A2(
						$elm$core$String$right,
						2,
						A3(
							$elm$core$String$padLeft,
							2,
							_Utils_chr('0'),
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$year(date))));
				} else {
					return A2(
						$justinmimbs$date$Date$padSignedInt,
						length,
						$justinmimbs$date$Date$year(date));
				}
			case 'Y':
				if (length === 2) {
					return A2(
						$elm$core$String$right,
						2,
						A3(
							$elm$core$String$padLeft,
							2,
							_Utils_chr('0'),
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$weekYear(date))));
				} else {
					return A2(
						$justinmimbs$date$Date$padSignedInt,
						length,
						$justinmimbs$date$Date$weekYear(date));
				}
			case 'Q':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$quarter(date));
					case 2:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$quarter(date));
					case 3:
						return 'Q' + $elm$core$String$fromInt(
							$justinmimbs$date$Date$quarter(date));
					case 4:
						return $justinmimbs$date$Date$withOrdinalSuffix(
							$justinmimbs$date$Date$quarter(date));
					case 5:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$quarter(date));
					default:
						return '';
				}
			case 'M':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$monthNumber(date));
					case 2:
						return A3(
							$elm$core$String$padLeft,
							2,
							_Utils_chr('0'),
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$monthNumber(date)));
					case 3:
						return language.monthNameShort(
							$justinmimbs$date$Date$month(date));
					case 4:
						return language.monthName(
							$justinmimbs$date$Date$month(date));
					case 5:
						return A2(
							$elm$core$String$left,
							1,
							language.monthNameShort(
								$justinmimbs$date$Date$month(date)));
					default:
						return '';
				}
			case 'w':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$weekNumber(date));
					case 2:
						return A3(
							$elm$core$String$padLeft,
							2,
							_Utils_chr('0'),
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$weekNumber(date)));
					default:
						return '';
				}
			case 'd':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$day(date));
					case 2:
						return A3(
							$elm$core$String$padLeft,
							2,
							_Utils_chr('0'),
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$day(date)));
					case 3:
						return language.dayWithSuffix(
							$justinmimbs$date$Date$day(date));
					default:
						return '';
				}
			case 'D':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$ordinalDay(date));
					case 2:
						return A3(
							$elm$core$String$padLeft,
							2,
							_Utils_chr('0'),
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$ordinalDay(date)));
					case 3:
						return A3(
							$elm$core$String$padLeft,
							3,
							_Utils_chr('0'),
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$ordinalDay(date)));
					default:
						return '';
				}
			case 'E':
				switch (length) {
					case 1:
						return language.weekdayNameShort(
							$justinmimbs$date$Date$weekday(date));
					case 2:
						return language.weekdayNameShort(
							$justinmimbs$date$Date$weekday(date));
					case 3:
						return language.weekdayNameShort(
							$justinmimbs$date$Date$weekday(date));
					case 4:
						return language.weekdayName(
							$justinmimbs$date$Date$weekday(date));
					case 5:
						return A2(
							$elm$core$String$left,
							1,
							language.weekdayNameShort(
								$justinmimbs$date$Date$weekday(date)));
					case 6:
						return A2(
							$elm$core$String$left,
							2,
							language.weekdayNameShort(
								$justinmimbs$date$Date$weekday(date)));
					default:
						return '';
				}
			case 'e':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$weekdayNumber(date));
					case 2:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$weekdayNumber(date));
					default:
						return A4(
							$justinmimbs$date$Date$formatField,
							language,
							_Utils_chr('E'),
							length,
							date);
				}
			default:
				return '';
		}
	});
var $justinmimbs$date$Date$formatWithTokens = F3(
	function (language, tokens, date) {
		return A3(
			$elm$core$List$foldl,
			F2(
				function (token, formatted) {
					if (token.$ === 'Field') {
						var _char = token.a;
						var length = token.b;
						return _Utils_ap(
							A4($justinmimbs$date$Date$formatField, language, _char, length, date),
							formatted);
					} else {
						var str = token.a;
						return _Utils_ap(str, formatted);
					}
				}),
			'',
			tokens);
	});
var $justinmimbs$date$Pattern$Literal = function (a) {
	return {$: 'Literal', a: a};
};
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 'Bad', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 'Good', a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _v0) {
		var parseA = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parseA(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					var _v2 = callback(a);
					var parseB = _v2.a;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3($elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
					}
				}
			});
	});
var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v2 = parseA(s0);
				if (_v2.$ === 'Bad') {
					var p = _v2.a;
					var x = _v2.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v2.a;
					var a = _v2.b;
					var s1 = _v2.c;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3(
							$elm$parser$Parser$Advanced$Good,
							p1 || p2,
							A2(func, a, b),
							s2);
					}
				}
			});
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$Good, false, a, s);
		});
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $elm$parser$Parser$Expecting = function (a) {
	return {$: 'Expecting', a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 'Token', a: a, b: b};
	});
var $elm$parser$Parser$toToken = function (str) {
	return A2(
		$elm$parser$Parser$Advanced$Token,
		str,
		$elm$parser$Parser$Expecting(str));
};
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 'AddRight', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {col: col, contextStack: contextStack, problem: problem, row: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 'Empty'};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.row, s.col, x, s.context));
	});
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _v1.a;
			var newRow = _v1.b;
			var newCol = _v1.c;
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				$elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var $elm$parser$Parser$token = function (str) {
	return $elm$parser$Parser$Advanced$token(
		$elm$parser$Parser$toToken(str));
};
var $justinmimbs$date$Pattern$escapedQuote = A2(
	$elm$parser$Parser$ignorer,
	$elm$parser$Parser$succeed(
		$justinmimbs$date$Pattern$Literal('\'')),
	$elm$parser$Parser$token('\'\''));
var $elm$parser$Parser$UnexpectedChar = {$: 'UnexpectedChar'};
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return $elm$parser$Parser$Advanced$Parser(
			function (s) {
				var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, s.offset, s.src);
				return _Utils_eq(newOffset, -1) ? A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
					$elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: 1, context: s.context, indent: s.indent, offset: s.offset + 1, row: s.row + 1, src: s.src}) : A3(
					$elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: s.col + 1, context: s.context, indent: s.indent, offset: newOffset, row: s.row, src: s.src}));
			});
	});
var $elm$parser$Parser$chompIf = function (isGood) {
	return A2($elm$parser$Parser$Advanced$chompIf, isGood, $elm$parser$Parser$UnexpectedChar);
};
var $justinmimbs$date$Pattern$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.src);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.offset, offset) < 0,
					_Utils_Tuple0,
					{col: col, context: s0.context, indent: s0.indent, offset: offset, row: row, src: s0.src});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.offset, s.row, s.col, s);
		});
};
var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
var $elm$parser$Parser$Advanced$getOffset = $elm$parser$Parser$Advanced$Parser(
	function (s) {
		return A3($elm$parser$Parser$Advanced$Good, false, s.offset, s);
	});
var $elm$parser$Parser$getOffset = $elm$parser$Parser$Advanced$getOffset;
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $elm$parser$Parser$Problem = function (a) {
	return {$: 'Problem', a: a};
};
var $elm$parser$Parser$Advanced$problem = function (x) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var $elm$parser$Parser$problem = function (msg) {
	return $elm$parser$Parser$Advanced$problem(
		$elm$parser$Parser$Problem(msg));
};
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $justinmimbs$date$Pattern$fieldRepeats = function (str) {
	var _v0 = $elm$core$String$toList(str);
	if (_v0.b && (!_v0.b.b)) {
		var _char = _v0.a;
		return A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(
					F2(
						function (x, y) {
							return A2($justinmimbs$date$Pattern$Field, _char, 1 + (y - x));
						})),
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$getOffset,
					$elm$parser$Parser$chompWhile(
						$elm$core$Basics$eq(_char)))),
			$elm$parser$Parser$getOffset);
	} else {
		return $elm$parser$Parser$problem('expected exactly one char');
	}
};
var $elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						A2(
							func,
							A3($elm$core$String$slice, s0.offset, s1.offset, s0.src),
							a),
						s1);
				}
			});
	});
var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2($elm$parser$Parser$Advanced$mapChompedString, $elm$core$Basics$always, parser);
};
var $elm$parser$Parser$getChompedString = $elm$parser$Parser$Advanced$getChompedString;
var $justinmimbs$date$Pattern$field = A2(
	$elm$parser$Parser$andThen,
	$justinmimbs$date$Pattern$fieldRepeats,
	$elm$parser$Parser$getChompedString(
		$elm$parser$Parser$chompIf($elm$core$Char$isAlpha)));
var $justinmimbs$date$Pattern$finalize = A2(
	$elm$core$List$foldl,
	F2(
		function (token, tokens) {
			var _v0 = _Utils_Tuple2(token, tokens);
			if (((_v0.a.$ === 'Literal') && _v0.b.b) && (_v0.b.a.$ === 'Literal')) {
				var x = _v0.a.a;
				var _v1 = _v0.b;
				var y = _v1.a.a;
				var rest = _v1.b;
				return A2(
					$elm$core$List$cons,
					$justinmimbs$date$Pattern$Literal(
						_Utils_ap(x, y)),
					rest);
			} else {
				return A2($elm$core$List$cons, token, tokens);
			}
		}),
	_List_Nil);
var $elm$parser$Parser$Advanced$lazy = function (thunk) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v0 = thunk(_Utils_Tuple0);
			var parse = _v0.a;
			return parse(s);
		});
};
var $elm$parser$Parser$lazy = $elm$parser$Parser$Advanced$lazy;
var $justinmimbs$date$Pattern$isLiteralChar = function (_char) {
	return (!_Utils_eq(
		_char,
		_Utils_chr('\''))) && (!$elm$core$Char$isAlpha(_char));
};
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						func(a),
						s1);
				} else {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				}
			});
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $justinmimbs$date$Pattern$literal = A2(
	$elm$parser$Parser$map,
	$justinmimbs$date$Pattern$Literal,
	$elm$parser$Parser$getChompedString(
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed(_Utils_Tuple0),
				$elm$parser$Parser$chompIf($justinmimbs$date$Pattern$isLiteralChar)),
			$elm$parser$Parser$chompWhile($justinmimbs$date$Pattern$isLiteralChar))));
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 'Append', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
		});
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $elm$parser$Parser$ExpectingEnd = {$: 'ExpectingEnd'};
var $elm$parser$Parser$Advanced$end = function (x) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return _Utils_eq(
				$elm$core$String$length(s.src),
				s.offset) ? A3($elm$parser$Parser$Advanced$Good, false, _Utils_Tuple0, s) : A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var $elm$parser$Parser$end = $elm$parser$Parser$Advanced$end($elm$parser$Parser$ExpectingEnd);
var $justinmimbs$date$Pattern$quotedHelp = function (result) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$andThen,
				function (str) {
					return $justinmimbs$date$Pattern$quotedHelp(
						_Utils_ap(result, str));
				},
				$elm$parser$Parser$getChompedString(
					A2(
						$elm$parser$Parser$ignorer,
						A2(
							$elm$parser$Parser$ignorer,
							$elm$parser$Parser$succeed(_Utils_Tuple0),
							$elm$parser$Parser$chompIf(
								$elm$core$Basics$neq(
									_Utils_chr('\'')))),
						$elm$parser$Parser$chompWhile(
							$elm$core$Basics$neq(
								_Utils_chr('\'')))))),
				A2(
				$elm$parser$Parser$andThen,
				function (_v0) {
					return $justinmimbs$date$Pattern$quotedHelp(result + '\'');
				},
				$elm$parser$Parser$token('\'\'')),
				$elm$parser$Parser$succeed(result)
			]));
};
var $justinmimbs$date$Pattern$quoted = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed($justinmimbs$date$Pattern$Literal),
		$elm$parser$Parser$chompIf(
			$elm$core$Basics$eq(
				_Utils_chr('\'')))),
	A2(
		$elm$parser$Parser$ignorer,
		$justinmimbs$date$Pattern$quotedHelp(''),
		$elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					$elm$parser$Parser$chompIf(
					$elm$core$Basics$eq(
						_Utils_chr('\''))),
					$elm$parser$Parser$end
				]))));
var $justinmimbs$date$Pattern$patternHelp = function (tokens) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$andThen,
				function (token) {
					return $justinmimbs$date$Pattern$patternHelp(
						A2($elm$core$List$cons, token, tokens));
				},
				$elm$parser$Parser$oneOf(
					_List_fromArray(
						[$justinmimbs$date$Pattern$field, $justinmimbs$date$Pattern$literal, $justinmimbs$date$Pattern$escapedQuote, $justinmimbs$date$Pattern$quoted]))),
				$elm$parser$Parser$lazy(
				function (_v0) {
					return $elm$parser$Parser$succeed(
						$justinmimbs$date$Pattern$finalize(tokens));
				})
			]));
};
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {col: col, problem: problem, row: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.row, p.col, p.problem);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 'Empty':
					return list;
				case 'AddRight':
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0.a;
		var _v1 = parse(
			{col: 1, context: _List_Nil, indent: 1, offset: 0, row: 1, src: src});
		if (_v1.$ === 'Good') {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (_v0.$ === 'Ok') {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (result.$ === 'Ok') {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $justinmimbs$date$Pattern$fromString = function (str) {
	return A2(
		$elm$core$Result$withDefault,
		_List_fromArray(
			[
				$justinmimbs$date$Pattern$Literal(str)
			]),
		A2(
			$elm$parser$Parser$run,
			$justinmimbs$date$Pattern$patternHelp(_List_Nil),
			str));
};
var $justinmimbs$date$Date$formatWithLanguage = F2(
	function (language, pattern) {
		var tokens = $elm$core$List$reverse(
			$justinmimbs$date$Pattern$fromString(pattern));
		return A2($justinmimbs$date$Date$formatWithTokens, language, tokens);
	});
var $justinmimbs$date$Date$monthToName = function (m) {
	switch (m.$) {
		case 'Jan':
			return 'January';
		case 'Feb':
			return 'February';
		case 'Mar':
			return 'March';
		case 'Apr':
			return 'April';
		case 'May':
			return 'May';
		case 'Jun':
			return 'June';
		case 'Jul':
			return 'July';
		case 'Aug':
			return 'August';
		case 'Sep':
			return 'September';
		case 'Oct':
			return 'October';
		case 'Nov':
			return 'November';
		default:
			return 'December';
	}
};
var $justinmimbs$date$Date$weekdayToName = function (wd) {
	switch (wd.$) {
		case 'Mon':
			return 'Monday';
		case 'Tue':
			return 'Tuesday';
		case 'Wed':
			return 'Wednesday';
		case 'Thu':
			return 'Thursday';
		case 'Fri':
			return 'Friday';
		case 'Sat':
			return 'Saturday';
		default:
			return 'Sunday';
	}
};
var $justinmimbs$date$Date$language_en = {
	dayWithSuffix: $justinmimbs$date$Date$withOrdinalSuffix,
	monthName: $justinmimbs$date$Date$monthToName,
	monthNameShort: A2(
		$elm$core$Basics$composeR,
		$justinmimbs$date$Date$monthToName,
		$elm$core$String$left(3)),
	weekdayName: $justinmimbs$date$Date$weekdayToName,
	weekdayNameShort: A2(
		$elm$core$Basics$composeR,
		$justinmimbs$date$Date$weekdayToName,
		$elm$core$String$left(3))
};
var $justinmimbs$date$Date$format = function (pattern) {
	return A2($justinmimbs$date$Date$formatWithLanguage, $justinmimbs$date$Date$language_en, pattern);
};
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $author$project$Render$Util$Label = function (a) {
	return {$: 'Label', a: a};
};
var $author$project$Render$Util$labelAs = $author$project$Render$Util$Label;
var $author$project$Render$Plot$groupByDate = A2(
	$elm$core$Basics$composeL,
	$author$project$Render$Group$Nest_,
	$elm$core$List$map(
		function (_v0) {
			var year = _v0.a;
			var noYearItems = _v0.b;
			var months = _v0.c;
			return A2(
				$author$project$Render$Group$Nest,
				$author$project$Render$Util$labelAs(
					$elm$core$String$fromInt(year)),
				A2(
					$elm$core$List$cons,
					$author$project$Render$Group$Some_(noYearItems),
					A2(
						$elm$core$List$map,
						function (_v1) {
							var month = _v1.a;
							var noDayItems = _v1.b;
							var days = _v1.c;
							return (!$elm$core$List$isEmpty(noDayItems)) ? A2(
								$author$project$Render$Group$Nest,
								$author$project$Render$Util$labelAs(
									A2(
										$justinmimbs$date$Date$format,
										'MMMM yyyy',
										A3($justinmimbs$date$Date$fromCalendarDate, year, month, 1))),
								A2(
									$elm$core$List$cons,
									$author$project$Render$Group$Some_(noDayItems),
									A2(
										$elm$core$List$map,
										function (_v2) {
											var day = _v2.a;
											var xs = _v2.b;
											return A2(
												$author$project$Render$Group$Some,
												$author$project$Render$Util$labelAs(
													A2(
														$justinmimbs$date$Date$format,
														'ddd MMMM, yyyy',
														A3($justinmimbs$date$Date$fromCalendarDate, year, month, day))),
												xs);
										},
										days))) : $author$project$Render$Group$Nest_(
								A2(
									$elm$core$List$cons,
									$author$project$Render$Group$Some_(noDayItems),
									A2(
										$elm$core$List$map,
										function (_v3) {
											var day = _v3.a;
											var xs = _v3.b;
											return A2(
												$author$project$Render$Group$Some,
												$author$project$Render$Util$labelAs(
													A2(
														$justinmimbs$date$Date$format,
														'ddd MMMM, yyyy',
														A3($justinmimbs$date$Date$fromCalendarDate, year, month, day))),
												xs);
										},
										days)));
						},
						months)));
		}));
var $author$project$Person$familyToLabel = function (family) {
	return 'Tannhaus';
};
var $author$project$Person$nameToString = function (name) {
	if (name.$ === 'Nickname') {
		var nickname = name.a;
		return nickname;
	} else {
		var firstName = name.a;
		var familyName = name.b;
		return firstName + (' ' + familyName);
	}
};
var $author$project$Person$Full = F2(
	function (a, b) {
		return {$: 'Full', a: a, b: b};
	});
var $author$project$Person$Nickname = function (a) {
	return {$: 'Nickname', a: a};
};
var $author$project$Person$names = function (person) {
	switch (person.$) {
		case 'Unknown':
			return _List_fromArray(
				[
					$author$project$Person$Nickname('Unknown')
				]);
		case 'Jonas':
			return _List_fromArray(
				[
					A2($author$project$Person$Full, 'Jonas', 'Kahnwald'),
					$author$project$Person$Nickname('Adam')
				]);
		case 'Martha':
			return _List_fromArray(
				[
					A2($author$project$Person$Full, 'Martha', 'Nielsen')
				]);
		case 'Martha_2':
			return _List_fromArray(
				[
					A2($author$project$Person$Full, 'Martha', 'Nielsen'),
					$author$project$Person$Nickname('Eve')
				]);
		case 'Martha_3':
			return _List_fromArray(
				[
					A2($author$project$Person$Full, 'Martha', 'Nielsen'),
					$author$project$Person$Nickname('Eve')
				]);
		case 'Benjamin':
			return _List_fromArray(
				[
					A2($author$project$Person$Full, 'Benjamin', 'Wöller'),
					A2($author$project$Person$Full, 'Bernandette', 'Wöller')
				]);
		case 'Mikkel':
			return _List_fromArray(
				[
					A2($author$project$Person$Full, 'Michael', 'Kahnwald'),
					A2($author$project$Person$Full, 'Mikkel', 'Nielsen')
				]);
		case 'Boris_Aleksander':
			return _List_fromArray(
				[
					A2($author$project$Person$Full, 'Boris', 'Niewald'),
					A2($author$project$Person$Full, 'Alexander', 'Köhler'),
					A2($author$project$Person$Full, 'Alexander', 'Tiedemann')
				]);
		case 'Hanno_Noah':
			return _List_fromArray(
				[
					A2($author$project$Person$Full, 'Hanno', 'Tauber'),
					$author$project$Person$Nickname('Noah')
				]);
		default:
			return _List_Nil;
	}
};
var $author$project$Person$uniqueName = function (person) {
	return A2(
		$elm$core$Maybe$withDefault,
		'Unidentified',
		A2(
			$elm$core$Maybe$map,
			$author$project$Person$nameToString,
			$elm$core$List$head(
				$author$project$Person$names(person))));
};
var $author$project$Render$Plot$groupByPerson = A2(
	$elm$core$Basics$composeL,
	$author$project$Render$Group$Nest_,
	$elm$core$List$map(
		function (_v0) {
			var family = _v0.a;
			var persons = _v0.b;
			return A2(
				$author$project$Render$Group$Nest,
				$author$project$Render$Util$labelAs(
					$author$project$Person$familyToLabel(family)),
				A2(
					$elm$core$List$map,
					function (_v1) {
						var person = _v1.a;
						var xs = _v1.b;
						return A2(
							$author$project$Render$Group$Some,
							$author$project$Render$Util$labelAs(
								$author$project$Person$uniqueName(person)),
							xs);
					},
					persons));
		}));
var $author$project$Render$Plot$groupBySeason = A2(
	$elm$core$Basics$composeL,
	$author$project$Render$Group$Nest_,
	$elm$core$List$map(
		function (_v0) {
			var season = _v0.a.a;
			var noEpisodeItems = _v0.b;
			var episodes = _v0.c;
			return A2(
				$author$project$Render$Group$Nest,
				$author$project$Render$Util$labelAs(
					'Season ' + $elm$core$String$fromInt(season)),
				A2(
					$elm$core$List$cons,
					$author$project$Render$Group$Some_(noEpisodeItems),
					A2(
						$elm$core$List$map,
						function (_v1) {
							var episode = _v1.a.a;
							var xs = _v1.b;
							return A2(
								$author$project$Render$Group$Some,
								$author$project$Render$Util$labelAs(
									'Episode ' + $elm$core$String$fromInt(episode)),
								xs);
						},
						episodes)));
		}));
var $author$project$Render$Group$form_ = A2(
	$elm$core$Basics$composeL,
	$author$project$Render$Group$Nest_,
	$elm$core$List$map(
		function (_v0) {
			var key = _v0.a;
			var items = _v0.b;
			return A2($author$project$Render$Group$Some, key, items);
		}));
var $author$project$Render$Group$mapKey = F2(
	function (f, group) {
		switch (group.$) {
			case 'None':
				return $author$project$Render$Group$None;
			case 'Some':
				var key = group.a;
				var list = group.b;
				return A2(
					$author$project$Render$Group$Some,
					f(key),
					list);
			case 'Some_':
				var list = group.a;
				return $author$project$Render$Group$Some_(list);
			case 'Nest':
				var key = group.a;
				var list = group.b;
				return A2(
					$author$project$Render$Group$Nest,
					f(key),
					A2(
						$elm$core$List$map,
						$author$project$Render$Group$mapKey(f),
						list));
			default:
				var list = group.a;
				return $author$project$Render$Group$Nest_(
					A2(
						$elm$core$List$map,
						$author$project$Render$Group$mapKey(f),
						list));
		}
	});
var $author$project$Event$worldToLabel = function (world) {
	switch (world.$) {
		case 'Origin_1':
			return 'Origin 1';
		case 'Origin_2':
			return 'Origin 2';
		case 'Adam':
			return 'Adam';
		default:
			return 'Eva';
	}
};
var $author$project$Render$Plot$groupByWorld = A2(
	$elm$core$Basics$composeR,
	$author$project$Render$Group$form_,
	$author$project$Render$Group$mapKey(
		A2($elm$core$Basics$composeR, $author$project$Event$worldToLabel, $author$project$Render$Util$labelAs)));
var $author$project$Render$Group$map = F2(
	function (f, group) {
		switch (group.$) {
			case 'None':
				return $author$project$Render$Group$None;
			case 'Some':
				var key = group.a;
				var list = group.b;
				return A2(
					$author$project$Render$Group$Some,
					key,
					A2($elm$core$List$map, f, list));
			case 'Some_':
				var list = group.a;
				return $author$project$Render$Group$Some_(
					A2($elm$core$List$map, f, list));
			case 'Nest':
				var key = group.a;
				var list = group.b;
				return A2(
					$author$project$Render$Group$Nest,
					key,
					A2(
						$elm$core$List$map,
						$author$project$Render$Group$map(f),
						list));
			default:
				var list = group.a;
				return $author$project$Render$Group$Nest_(
					A2(
						$elm$core$List$map,
						$author$project$Render$Group$map(f),
						list));
		}
	});
var $author$project$Render$Plot$toGroupY = function (yAxis) {
	switch (yAxis.$) {
		case 'YNone':
			return $author$project$Render$Group$None;
		case 'YAll':
			var events = yAxis.a;
			return $author$project$Render$Group$Some_(events);
		case 'YByDate':
			var events = yAxis.a;
			return $author$project$Render$Plot$groupByDate(events);
		case 'YByPerson':
			var events = yAxis.a;
			return $author$project$Render$Plot$groupByPerson(events);
		case 'YBySeason':
			var events = yAxis.a;
			return $author$project$Render$Plot$groupBySeason(events);
		default:
			var events = yAxis.a;
			return $author$project$Render$Plot$groupByWorld(events);
	}
};
var $author$project$Render$Plot$toGroupX = function (xAxis) {
	return A2(
		$author$project$Render$Group$map,
		$author$project$Render$Plot$toGroupY,
		function () {
			switch (xAxis.$) {
				case 'XNone':
					return $author$project$Render$Group$None;
				case 'XAll':
					var yAxis = xAxis.a;
					return $author$project$Render$Group$Some_(
						$elm$core$List$singleton(yAxis));
				case 'XByDate':
					var yAxis = xAxis.a;
					return $author$project$Render$Plot$groupByDate(yAxis);
				case 'XByPerson':
					var yAxis = xAxis.a;
					return $author$project$Render$Plot$groupByPerson(yAxis);
				case 'XBySeason':
					var yAxis = xAxis.a;
					return $author$project$Render$Plot$groupBySeason(yAxis);
				default:
					var yAxis = xAxis.a;
					return $author$project$Render$Plot$groupByWorld(yAxis);
			}
		}());
};
var $author$project$Render$Util$distribute = function (margin) {
	return $elm$core$List$indexedMap(
		F2(
			function (idx, val) {
				return _Utils_Tuple2(idx * margin, val);
			}));
};
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$g = $elm$svg$Svg$trustedNode('g');
var $author$project$Render$Event$height = 130;
var $elm$svg$Svg$rect = $elm$svg$Svg$trustedNode('rect');
var $elm$svg$Svg$Attributes$rx = _VirtualDom_attribute('rx');
var $elm$svg$Svg$Attributes$ry = _VirtualDom_attribute('ry');
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var $elm$svg$Svg$Attributes$style = _VirtualDom_attribute('style');
var $author$project$Render$Util$translate = F2(
	function (x, y) {
		return 'transform: translate(' + ($elm$core$String$fromFloat(x) + ('px, ' + ($elm$core$String$fromFloat(y) + 'px);')));
	});
var $elm$svg$Svg$circle = $elm$svg$Svg$trustedNode('circle');
var $elm$svg$Svg$Attributes$cx = _VirtualDom_attribute('cx');
var $elm$svg$Svg$Attributes$cy = _VirtualDom_attribute('cy');
var $elm$svg$Svg$Attributes$id = _VirtualDom_attribute('id');
var $elm$svg$Svg$image = $elm$svg$Svg$trustedNode('image');
var $author$project$Person$knownStages = function (person) {
	knownStages:
	while (true) {
		switch (person.$) {
			case 'Agnes':
				return _List_fromArray(
					[$author$project$Person$Teen, $author$project$Person$Adult]);
			case 'Bartosz':
				return _List_fromArray(
					[$author$project$Person$Teen, $author$project$Person$Adult]);
			case 'Boris_Aleksander':
				return _List_fromArray(
					[$author$project$Person$Teen, $author$project$Person$Adult]);
			case 'Bernandette':
				return _List_fromArray(
					[$author$project$Person$Adult]);
			case 'Bernd':
				return _List_fromArray(
					[$author$project$Person$Adult, $author$project$Person$Old]);
			case 'Charlotte':
				return _List_fromArray(
					[$author$project$Person$Teen, $author$project$Person$Adult]);
			case 'Claudia':
				return _List_fromArray(
					[$author$project$Person$Teen, $author$project$Person$Adult, $author$project$Person$Old]);
			case 'Clausen':
				return _List_fromArray(
					[$author$project$Person$Teen, $author$project$Person$Adult]);
			case 'Daniel':
				return _List_fromArray(
					[$author$project$Person$Adult]);
			case 'Doris':
				return _List_fromArray(
					[$author$project$Person$Adult]);
			case 'Egon':
				return _List_fromArray(
					[$author$project$Person$Adult, $author$project$Person$Old]);
			case 'Elisabeth':
				return _List_fromArray(
					[$author$project$Person$Teen, $author$project$Person$Adult]);
			case 'Franziska':
				return _List_fromArray(
					[$author$project$Person$Teen, $author$project$Person$Old]);
			case 'Gretchen':
				return _List_fromArray(
					[$author$project$Person$Adult]);
			case 'Gustav':
				return _List_fromArray(
					[$author$project$Person$Child, $author$project$Person$Old]);
			case 'Hannah':
				return _List_fromArray(
					[$author$project$Person$Teen, $author$project$Person$Adult]);
			case 'Hanno_Noah':
				return _List_fromArray(
					[$author$project$Person$Child, $author$project$Person$Teen, $author$project$Person$Adult]);
			case 'Heinrich':
				return _List_fromArray(
					[$author$project$Person$Adult]);
			case 'Helge':
				return _List_fromArray(
					[$author$project$Person$Child, $author$project$Person$Adult, $author$project$Person$Old]);
			case 'Ines':
				return _List_fromArray(
					[$author$project$Person$Teen, $author$project$Person$Adult, $author$project$Person$Old]);
			case 'Jana':
				return _List_fromArray(
					[$author$project$Person$Teen, $author$project$Person$Adult, $author$project$Person$Old]);
			case 'Jonas':
				return _List_fromArray(
					[$author$project$Person$Teen, $author$project$Person$Adult, $author$project$Person$Old]);
			case 'Katharina':
				return _List_fromArray(
					[$author$project$Person$Teen, $author$project$Person$Adult]);
			case 'Mads':
				return _List_fromArray(
					[$author$project$Person$Child]);
			case 'Magnus':
				return _List_fromArray(
					[$author$project$Person$Teen, $author$project$Person$Adult]);
			case 'Martha':
				return _List_fromArray(
					[$author$project$Person$Teen, $author$project$Person$Adult, $author$project$Person$Old]);
			case 'Mikkel':
				return _List_fromArray(
					[$author$project$Person$Child, $author$project$Person$Adult]);
			case 'Peter':
				return _List_fromArray(
					[$author$project$Person$Teen, $author$project$Person$Adult]);
			case 'Regina':
				return _List_fromArray(
					[$author$project$Person$Teen, $author$project$Person$Adult]);
			case 'Silja':
				return _List_fromArray(
					[$author$project$Person$Child, $author$project$Person$Teen, $author$project$Person$Adult]);
			case 'HGTannhaus':
				return _List_fromArray(
					[$author$project$Person$Adult, $author$project$Person$Old]);
			case 'Torben':
				return _List_fromArray(
					[$author$project$Person$Adult]);
			case 'Tronte':
				return _List_fromArray(
					[$author$project$Person$Teen, $author$project$Person$Old, $author$project$Person$Adult]);
			case 'Ulrich':
				return _List_fromArray(
					[$author$project$Person$Teen, $author$project$Person$Old, $author$project$Person$Adult]);
			case 'Unknown':
				return _List_fromArray(
					[$author$project$Person$Teen, $author$project$Person$Old, $author$project$Person$Adult]);
			case 'Martha_2':
				var $temp$person = $author$project$Person$Martha;
				person = $temp$person;
				continue knownStages;
			case 'Martha_3':
				var $temp$person = $author$project$Person$Martha;
				person = $temp$person;
				continue knownStages;
			case 'Bartosz_2':
				var $temp$person = $author$project$Person$Bartosz;
				person = $temp$person;
				continue knownStages;
			case 'Claudia_2':
				var $temp$person = $author$project$Person$Claudia;
				person = $temp$person;
				continue knownStages;
			case 'Claudia_3':
				var $temp$person = $author$project$Person$Claudia;
				person = $temp$person;
				continue knownStages;
			default:
				return _List_Nil;
		}
	}
};
var $author$project$Person$isKnownStage = F2(
	function (person, stage) {
		return A2(
			$elm$core$List$member,
			stage,
			$author$project$Person$knownStages(person));
	});
var $author$project$Person$stageToString = function (stage) {
	switch (stage.$) {
		case 'Child':
			return 'child';
		case 'Teen':
			return 'teen';
		case 'Adult':
			return 'adult';
		case 'Old':
			return 'old';
		default:
			return 'poodle';
	}
};
var $author$project$Person$picture = F2(
	function (person, stage) {
		return A2(
			$elm$core$Maybe$map,
			function (fileName) {
				return './assets/' + (fileName + '_c.png');
			},
			A2($author$project$Person$isKnownStage, person, stage) ? $elm$core$Maybe$Just(
				$author$project$Person$codename(person) + ('/' + $author$project$Person$stageToString(stage))) : $elm$core$Maybe$Nothing);
	});
var $elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var $author$project$Render$Person$radius = 20;
var $author$project$Person$uniqueId = F2(
	function (person, stage) {
		return $author$project$Person$codename(person) + ('/' + $author$project$Person$stageToString(stage));
	});
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $elm$svg$Svg$Attributes$xlinkHref = function (value) {
	return A3(
		_VirtualDom_attributeNS,
		'http://www.w3.org/1999/xlink',
		'xlink:href',
		_VirtualDom_noJavaScriptUri(value));
};
var $author$project$Render$Person$view = function (_v0) {
	var personId = _v0.a;
	var personStage = _v0.b;
	return A2(
		$elm$svg$Svg$g,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$id(
				A2($author$project$Person$uniqueId, personId, personStage))
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$r(
						$elm$core$String$fromFloat($author$project$Render$Person$radius)),
						$elm$svg$Svg$Attributes$cx(
						$elm$core$String$fromFloat($author$project$Render$Person$radius)),
						$elm$svg$Svg$Attributes$cy(
						$elm$core$String$fromFloat($author$project$Render$Person$radius)),
						$elm$svg$Svg$Attributes$stroke('black'),
						$elm$svg$Svg$Attributes$strokeWidth(
						$elm$core$String$fromInt(1)),
						$elm$svg$Svg$Attributes$fill('none')
					]),
				_List_Nil),
				function () {
				var _v1 = A2($author$project$Person$picture, personId, personStage);
				if (_v1.$ === 'Just') {
					var src = _v1.a;
					return A2(
						$elm$svg$Svg$image,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$xlinkHref(src),
								$elm$svg$Svg$Attributes$width(
								$elm$core$String$fromFloat($author$project$Render$Person$radius * 2)),
								$elm$svg$Svg$Attributes$height(
								$elm$core$String$fromFloat($author$project$Render$Person$radius * 2))
							]),
						_List_Nil);
				} else {
					return A2($elm$svg$Svg$g, _List_Nil, _List_Nil);
				}
			}()
			]));
};
var $author$project$Render$Event$width = 350;
var $elm$svg$Svg$foreignObject = $elm$svg$Svg$trustedNode('foreignObject');
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $author$project$Render$Util$wrapText = F3(
	function (width, height, stringToWrap) {
		return A2(
			$elm$svg$Svg$foreignObject,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$width(
					$elm$core$String$fromInt(width)),
					$elm$svg$Svg$Attributes$height(
					$elm$core$String$fromInt(height))
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'font-family', 'sans-serif'),
							A2($elm$html$Html$Attributes$style, 'font-size', '13px')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(stringToWrap)
						]))
				]));
	});
var $elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var $elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var $author$project$Render$Event$view = function (event) {
	return _Utils_Tuple2(
		{height: $author$project$Render$Event$height, width: $author$project$Render$Event$width},
		A2(
			$elm$svg$Svg$g,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$rect,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$rx(
							$elm$core$String$fromInt(15)),
							$elm$svg$Svg$Attributes$ry(
							$elm$core$String$fromInt(15)),
							$elm$svg$Svg$Attributes$x(
							$elm$core$String$fromInt(0)),
							$elm$svg$Svg$Attributes$y(
							$elm$core$String$fromInt(0)),
							$elm$svg$Svg$Attributes$width(
							$elm$core$String$fromInt($author$project$Render$Event$width)),
							$elm$svg$Svg$Attributes$height(
							$elm$core$String$fromInt($author$project$Render$Event$height)),
							$elm$svg$Svg$Attributes$stroke('black'),
							$elm$svg$Svg$Attributes$fill('none'),
							$elm$svg$Svg$Attributes$strokeWidth(
							$elm$core$String$fromInt(3))
						]),
					_List_Nil),
					A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$style(
							A2($author$project$Render$Util$translate, 10, $author$project$Render$Event$height / 6))
						]),
					A2(
						$elm$core$List$map,
						function (_v0) {
							var shift = _v0.a;
							var _v1 = _v0.b;
							var personId = _v1.a;
							var stage = _v1.b;
							return A2(
								$elm$svg$Svg$g,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$style(
										A2($author$project$Render$Util$translate, shift, 0))
									]),
								_List_fromArray(
									[
										$author$project$Render$Person$view(
										_Utils_Tuple2(personId, stage))
									]));
						},
						A2($author$project$Render$Util$distribute, 50, event.participants))),
					A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$style(
							A2($author$project$Render$Util$translate, 10, $author$project$Render$Event$height / 2))
						]),
					_List_fromArray(
						[
							A3($author$project$Render$Util$wrapText, 330, 500, event.description)
						]))
				])));
};
var $elm$svg$Svg$Attributes$dominantBaseline = _VirtualDom_attribute('dominant-baseline');
var $author$project$Render$Label$height = 20;
var $elm$svg$Svg$text = $elm$virtual_dom$VirtualDom$text;
var $elm$svg$Svg$text_ = $elm$svg$Svg$trustedNode('text');
var $author$project$Render$Label$add = F2(
	function (_v0, _v1) {
		var label = _v0.a;
		var size = _v1.a;
		var to = _v1.b;
		return _Utils_Tuple2(
			{height: size.height + $author$project$Render$Label$height, width: size.width},
			A2(
				$elm$svg$Svg$g,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$text_,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$dominantBaseline('hanging')
							]),
						_List_fromArray(
							[
								$elm$svg$Svg$text(label)
							])),
						A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$style(
								A2($author$project$Render$Util$translate, 0, $author$project$Render$Label$height))
							]),
						_List_fromArray(
							[to]))
					])));
	});
var $author$project$Render$Util$mapAccum = F3(
	function (f, acc0, list) {
		var _v0 = A3(
			$elm$core$List$foldl,
			F2(
				function (x, _v1) {
					var acc1 = _v1.a;
					var ys = _v1.b;
					var _v2 = A2(f, x, acc1);
					var acc2 = _v2.a;
					var y = _v2.b;
					return _Utils_Tuple2(
						acc2,
						A2($elm$core$List$cons, y, ys));
				}),
			_Utils_Tuple2(acc0, _List_Nil),
			list);
		var accFinal = _v0.a;
		var generatedList = _v0.b;
		return _Utils_Tuple2(
			accFinal,
			$elm$core$List$reverse(generatedList));
	});
var $elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$max, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Render$Util$sized = F2(
	function (w, h) {
		return $elm$core$Tuple$pair(
			{height: h, width: w});
	});
var $author$project$Render$Group$distribute = F3(
	function (direction, renderItem, items) {
		if (direction.$ === 'Vertical') {
			var vertMargin = 10;
			var renderedItems = A2($elm$core$List$map, renderItem, items);
			var totalWidth = A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$List$maximum(
					A2(
						$elm$core$List$map,
						A2(
							$elm$core$Basics$composeR,
							$elm$core$Tuple$first,
							function ($) {
								return $.width;
							}),
						renderedItems)));
			var _v1 = A3(
				$author$project$Render$Util$mapAccum,
				F2(
					function (_v2, prev) {
						var height = _v2.a.height;
						var item = _v2.b;
						var shift = (prev + height) + vertMargin;
						return _Utils_Tuple2(
							shift,
							A2(
								$elm$svg$Svg$g,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$style(
										A2($author$project$Render$Util$translate, 0, prev))
									]),
								_List_fromArray(
									[item])));
					}),
				vertMargin,
				renderedItems);
			var totalHeight = _v1.a;
			var withTransforms = _v1.b;
			return A3(
				$author$project$Render$Util$sized,
				totalWidth,
				totalHeight,
				A2($elm$svg$Svg$g, _List_Nil, withTransforms));
		} else {
			var renderedItems = A2($elm$core$List$map, renderItem, items);
			var totalHeight = A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$List$maximum(
					A2(
						$elm$core$List$map,
						A2(
							$elm$core$Basics$composeR,
							$elm$core$Tuple$first,
							function ($) {
								return $.height;
							}),
						renderedItems)));
			var horzMargin = 10;
			var _v3 = A3(
				$author$project$Render$Util$mapAccum,
				F2(
					function (_v4, prev) {
						var width = _v4.a.width;
						var item = _v4.b;
						var shift = (prev + width) + horzMargin;
						return _Utils_Tuple2(
							shift,
							A2(
								$elm$svg$Svg$g,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$style(
										A2($author$project$Render$Util$translate, prev, 0))
									]),
								_List_fromArray(
									[item])));
					}),
				horzMargin,
				renderedItems);
			var totalWidth = _v3.a;
			var withTransforms = _v3.b;
			return A3(
				$author$project$Render$Util$sized,
				totalWidth,
				totalHeight,
				A2($elm$svg$Svg$g, _List_Nil, withTransforms));
		}
	});
var $author$project$Render$Util$noSize = A2($author$project$Render$Util$sized, 0, 0);
var $author$project$Render$Group$view = F3(
	function (direction, renderItem, group) {
		var _v0 = _Utils_Tuple2(direction, group);
		if (_v0.a.$ === 'Vertical') {
			switch (_v0.b.$) {
				case 'Some':
					var _v1 = _v0.a;
					var _v2 = _v0.b;
					var label = _v2.a;
					var items = _v2.b;
					return A2(
						$author$project$Render$Label$add,
						label,
						A3($author$project$Render$Group$distribute, $author$project$Render$Group$Vertical, renderItem, items));
				case 'Some_':
					var _v3 = _v0.a;
					var items = _v0.b.a;
					return A3($author$project$Render$Group$distribute, $author$project$Render$Group$Vertical, renderItem, items);
				case 'Nest':
					var _v4 = _v0.a;
					var _v5 = _v0.b;
					var label = _v5.a;
					var nestedGroups = _v5.b;
					return A2(
						$author$project$Render$Label$add,
						label,
						A3(
							$author$project$Render$Group$distribute,
							$author$project$Render$Group$Vertical,
							A2($author$project$Render$Group$view, $author$project$Render$Group$Vertical, renderItem),
							nestedGroups));
				case 'Nest_':
					var _v6 = _v0.a;
					var nestedGroups = _v0.b.a;
					return A3(
						$author$project$Render$Group$distribute,
						$author$project$Render$Group$Vertical,
						A2($author$project$Render$Group$view, $author$project$Render$Group$Vertical, renderItem),
						nestedGroups);
				default:
					var _v7 = _v0.a;
					var _v8 = _v0.b;
					return $author$project$Render$Util$noSize(
						A2($elm$svg$Svg$g, _List_Nil, _List_Nil));
			}
		} else {
			switch (_v0.b.$) {
				case 'Some':
					var _v9 = _v0.a;
					var _v10 = _v0.b;
					var label = _v10.a;
					var items = _v10.b;
					return A2(
						$author$project$Render$Label$add,
						label,
						A3($author$project$Render$Group$distribute, $author$project$Render$Group$Horizontal, renderItem, items));
				case 'Some_':
					var _v11 = _v0.a;
					var items = _v0.b.a;
					return A3($author$project$Render$Group$distribute, $author$project$Render$Group$Horizontal, renderItem, items);
				case 'Nest':
					var _v12 = _v0.a;
					var _v13 = _v0.b;
					var label = _v13.a;
					var nestedGroups = _v13.b;
					return A2(
						$author$project$Render$Label$add,
						label,
						A3(
							$author$project$Render$Group$distribute,
							$author$project$Render$Group$Horizontal,
							A2($author$project$Render$Group$view, $author$project$Render$Group$Horizontal, renderItem),
							nestedGroups));
				case 'Nest_':
					var _v14 = _v0.a;
					var nestedGroups = _v0.b.a;
					return A3(
						$author$project$Render$Group$distribute,
						$author$project$Render$Group$Horizontal,
						A2($author$project$Render$Group$view, $author$project$Render$Group$Horizontal, renderItem),
						nestedGroups);
				default:
					var _v15 = _v0.a;
					var _v16 = _v0.b;
					return $author$project$Render$Util$noSize(
						A2($elm$svg$Svg$g, _List_Nil, _List_Nil));
			}
		}
	});
var $author$project$Render$Plot$viewPlot = A2(
	$elm$core$Basics$composeR,
	$author$project$Render$Plot$toGroupX,
	A2(
		$elm$core$Basics$composeR,
		A2(
			$author$project$Render$Group$view,
			$author$project$Render$Group$Horizontal,
			A2($author$project$Render$Group$view, $author$project$Render$Group$Vertical, $author$project$Render$Event$view)),
		function (_v0) {
			var width = _v0.a.width;
			var height = _v0.a.height;
			var v = _v0.b;
			return A2(
				$elm$svg$Svg$svg,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$width(
						$elm$core$String$fromFloat(width)),
						$elm$svg$Svg$Attributes$height(
						$elm$core$String$fromFloat(height))
					]),
				_List_fromArray(
					[v]));
		}));
var $author$project$Render$Plot$view = function (spec) {
	return A2(
		$elm$core$Basics$composeR,
		$author$project$Render$Plot$plot(spec),
		$author$project$Render$Plot$viewPlot);
};
var $author$project$Main$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('links')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$a,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$href('#'),
								$elm$html$Html$Events$onClick($author$project$Main$ToTimeline)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Timeline')
							])),
						A2(
						$elm$html$Html$a,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$href('#'),
								$elm$html$Html$Events$onClick(
								$author$project$Main$ToGenealogy($author$project$Event$Adam))
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Adam Gen.')
							])),
						A2(
						$elm$html$Html$a,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$href('#'),
								$elm$html$Html$Events$onClick(
								$author$project$Main$ToGenealogy($author$project$Event$Eva))
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Eva Gen.')
							])),
						A2(
						$elm$html$Html$a,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$href('#'),
								$elm$html$Html$Events$onClick(
								$author$project$Main$ToGenealogy($author$project$Event$Origin_1))
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Origin Gen.')
							]))
					])),
				function () {
				if (model.$ === 'Timeline') {
					var eventGraph = model.a;
					return A2(
						$elm$html$Html$map,
						$author$project$Main$Internal,
						A2(
							$author$project$Render$Plot$view,
							{
								x: $author$project$Render$Plot$ByWorld($author$project$Render$Plot$noFilter),
								y: $author$project$Render$Plot$ByDate($author$project$Render$Plot$noFilter)
							},
							eventGraph));
				} else {
					return A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id($author$project$Main$parentElemId)
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$id($author$project$Main$targetElemId)
									]),
								_List_Nil)
							]));
				}
			}()
			]));
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{init: $author$project$Main$init, subscriptions: $author$project$Main$subscription, update: $author$project$Main$update, view: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));