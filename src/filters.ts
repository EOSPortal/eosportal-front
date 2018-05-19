import Vue from 'vue'

Vue.filter("humanNum", _number => {
	const abs = Math.abs(Number(_number));
	const fix = (n) => n.toFixed(2);
	return abs >= 1.0e+9
		? fix(abs / 1.0e+9) + "B"
		: abs >= 1.0e+6 ? fix(abs / 1.0e+6) + "M"
			: abs >= 1.0e+3 ? fix(abs / 1.0e+3) + "K"
				: abs;
});