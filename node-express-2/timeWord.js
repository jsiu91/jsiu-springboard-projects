// 0-11 AM.
// 12-23 PM.

/** 
Input	Expected Output
00:00	midnight
00:12	twelve twelve am
01:00	one o’clock am
06:01	six oh one am
06:10	six ten am
06:18	six eighteen am
06:30	six thirty am
10:34	ten thirty four am
12:00	noon
12:09	twelve oh nine pm
23:23	eleven twenty three pm
*/

function timeWord (time) {
	const hours = time.slice(0, 2);
	const minutes = time.slice(3, 5);
	let result = '';

	if (hours === '00' && minutes === '00') return 'midnight';
	if (hours === '12' && minutes === '00') return 'noon';

	result += hoursToString(hours);
	result += minutesToString(minutes);

	if (hours >= 0 && hours <= 11) result += 'am';
	if (hours >= 12 && hours <= 23) result += 'pm';

	return result;
}

function hoursToString (hours) {
	if (hours === '00' || hours === '12') return 'twelve ';
	else if (hours === '01' || hours === '13') return 'one ';
	else if (hours === '02' || hours === '14') return 'two ';
	else if (hours === '03' || hours === '15') return 'three ';
	else if (hours === '04' || hours === '16') return 'four ';
	else if (hours === '05' || hours === '17') return 'five ';
	else if (hours === '06' || hours === '18') return 'six ';
	else if (hours === '07' || hours === '19') return 'seven ';
	else if (hours === '08' || hours === '20') return 'eight ';
	else if (hours === '09' || hours === '21') return 'nine ';
	else if (hours === '10' || hours === '22') return 'ten ';
	else if (hours === '11' || hours === '23') return 'eleven ';
}

function minutesToString (minutes) {
	if (minutes === '00') return `o’clock `;
	else if (minutes === '01') return 'oh one ';
	else if (minutes === '02') return 'oh two ';
	else if (minutes === '03') return 'oh three ';
	else if (minutes === '04') return 'oh four ';
	else if (minutes === '05') return 'oh five ';
	else if (minutes === '06') return 'oh six  ';
	else if (minutes === '07') return 'oh seven ';
	else if (minutes === '08') return 'oh eight ';
	else if (minutes === '09') return 'oh nine ';
	else if (minutes === '10') return 'ten ';
	else if (minutes === '11') return 'eleven ';
	else if (minutes === '12') return 'twelve ';
	else if (minutes === '13') return 'thirteen ';
	else if (minutes === '14') return 'fourteen ';
	else if (minutes === '15') return 'fifteen ';
	else if (minutes === '16') return 'sixteen ';
	else if (minutes === '17') return 'seventeen ';
	else if (minutes === '18') return 'eighteen ';
	else if (minutes === '19') return 'nineteen ';
	else if (minutes === '20') return 'twenty ';
	else if (minutes === '21') return 'twenty one ';
	else if (minutes === '22') return 'twenty two ';
	else if (minutes === '23') return 'twenty three ';
	else if (minutes === '24') return 'twenty four ';
	else if (minutes === '25') return 'twenty five ';
	else if (minutes === '26') return 'twenty six ';
	else if (minutes === '27') return 'twenty seven ';
	else if (minutes === '28') return 'twenty eight ';
	else if (minutes === '29') return 'twenty nine ';
	else if (minutes === '30') return 'thirty ';
	else if (minutes === '31') return 'thirty one ';
	else if (minutes === '32') return 'thirty two ';
	else if (minutes === '33') return 'thirty three ';
	else if (minutes === '34') return 'thirty four ';
	else if (minutes === '35') return 'thirty five ';
	else if (minutes === '36') return 'thirty six ';
	else if (minutes === '37') return 'thirty seven ';
	else if (minutes === '38') return 'thirty eight ';
	else if (minutes === '39') return 'thirty nine ';
	else if (minutes === '40') return 'forty ';
	else if (minutes === '41') return 'forty one ';
	else if (minutes === '42') return 'forty two ';
	else if (minutes === '43') return 'forty three ';
	else if (minutes === '44') return 'forty four ';
	else if (minutes === '45') return 'forty five ';
	else if (minutes === '46') return 'forty six ';
	else if (minutes === '47') return 'forty seven ';
	else if (minutes === '48') return 'forty eight ';
	else if (minutes === '49') return 'forty nine ';
	else if (minutes === '50') return 'fifty ';
	else if (minutes === '51') return 'fifty one ';
	else if (minutes === '52') return 'fifty two ';
	else if (minutes === '53') return 'fifty three ';
	else if (minutes === '54') return 'fifty four ';
	else if (minutes === '55') return 'fifty five ';
	else if (minutes === '56') return 'fifty six ';
	else if (minutes === '57') return 'fifty seven ';
	else if (minutes === '58') return 'fifty eight ';
	else if (minutes === '59') return 'fifty nine ';
}

module.exports = timeWord;
