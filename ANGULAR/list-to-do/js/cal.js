/*
.......................................................
.                Выбор даты и времени                 .
.                версия от 06.11.2014                 .
.                                                     .
.                  (C) By Protocoder                  .
.                     protocoder.ru                   .
.                                                     .
. распространяется по лицензии Creative Commons BY-NC .
.   http://creativecommons.org/licenses/by-nc/3.0/    .
.......................................................
*/

/**
 * Создание каленадаря
 *
 * @param container			DOM объект контейнера для календаря
 * @param options			Опции
 */
function CALENDAR( container, options ) {
/*
	options = {
		hidden				- true, если календарь должен быть скрыт после создания, по-умолчанию false
		hideOnKeysOrMouse	- true, если календарь закрывается по ESC или щелчком вне его области, по-умолчанию false
		mhFirst				- true если дата вида мм_дд_гг, по-умолачнию false
		suFirst				- true, если неделя начинается с воскресения, по-умолчанию false
		lng					- язык календаря rus или eng, по-умолачнию rus
		userHandler			- пользователсякая функция обработки событий вида function( calendarObject, eventType, month, year, hours, mins, secs, day, month, year ) {}
		zIndex				- zIndex окна календаря, по-умолчанию 5000
		showTime			- true если календарь со временем, по-умолчанию false
		ssTime				- true если время с секундами, по-умолчанию false
	}
*/
	var self = this;

	if ( !options ) options = {};

	this.container = null;
	this.userHandler = options.userHandler ? options.userHandler : null;

	this.dom = {
		main: null,
		year: null,
		yearsLayer: null,
		yearsTds: null,
		month: null,
		monthsLayer: null,
		monthsTds: null,
		hdrRow: null
	};

	this.cells = null;

	this.mhFirst = options.mhFirst === true;
	this.moFirst = options.suFirst !== true;
	this.lng = options.lng == "eng" ? "eng" : "rus";

	this.day = this.dayMonth = this.dayYear = this.month = this.year = null;
	this.hours = this.mins = this.secs = null;

	this.zIndex = options.zIndex ? options.zIndex : 5000;

	this.showTime = options.showTime === true;
	this.ssTime = options.ssTime === true;
	this.hideOnKeysOrMouse = options.hideOnKeysOrMouse === true;

	this.ghEC = function( e ) {
		if (
			( e.type == "keydown" && e.which == 27 ) ||
			( e.type == "mousedown" && !$.contains( self.dom.yearsLayer, e.target ) && !$.contains( self.dom.monthsLayer, e.target ) )
		) {
			self.hideAllLayers();
			return false;
		}
	};

	this.build( container, options.hidden === true );
}

//проверка является ли данный день по номеру ( 1-7 ) выходным
CALENDAR.isHoliday = function( num, moFirst ) {
	if ( num < 1 || num > 7 ) return false;

	return moFirst ? ( num == 6 || num == 7 ) : ( num == 1 || num == 7 );
};

//в зависимотсти от порядкового номера и с какого дня начинается неделя выдать номер дня для массива 0 - 6 { пн, вт, ср, чт, пт, сб, вс }
CALENDAR.getShiftByNum = function( num, moFirst ) {
	if ( num < 1 || num > 7 ) return 1;

	if ( !moFirst )
		if ( num == 1 ) return 6;
		else num--;

	return num - 1;
};

CALENDAR.monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

CALENDAR.getDaysInMonth = function( month, year ) {
	month--;
	if ( month < 0 || month > 11 ) return 0;

	var d = CALENDAR.monthDays[month];

	if ( month == 1 ) {
		if ( ( year % 400 ) == 0 ) d++;
		if ( ( year % 4 ) == 0 && ( year % 100 ) != 0 ) d++;
	}

	return d;
};

CALENDAR.getWeekDay = function( day, month, year, moFirst ) {
			var a = Math.floor( ( 14 - month ) / 12 );
			var y = year - a;
			var m = month + 12 * a - 2;
			var d = ( day + y + Math.floor( y / 4 ) - Math.floor( y / 100 ) + Math.floor( y / 400 ) + Math.floor( ( 31 * m ) / 12 ) ) % 7;
			//d = 0-6 Su,Mo...
			if ( moFirst ) {
				if ( d == 0 ) d = 6; else d--; //Mo,Tu
			}
			return d;
};

CALENDAR.getCurDate = function() {
	var cd = new Date();
	return { "day": cd.getDate(),  "month": cd.getMonth() + 1, "year": cd.getFullYear(), "hours": cd.getHours(), "mins": cd.getMinutes(), "secs": cd.getSeconds() };
};

CALENDAR.monthNames = {
	"rus": ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
   	"eng": ["January","February","March","April","May","June","July","August","September","October","November","December"]
};

CALENDAR.dayNames = {
	"rus": ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"],
	"eng": ["Mo","Tu","We","Th","Fr","Sa","Su"]
};

CALENDAR.strs = {
	"rus": {
		"setCurDate": "установить текущую дату"
	},
	"eng": {
		"curDate": "set current date"
	}
};

CALENDAR.validateAndParseDate = function( d, eng ) {
	var t = /^\s*(\d{1,2})[./\-](\d{1,2})[./\-](\d{1,4})(?:\s|$)/i.exec( d );
	if ( !t ) return null;

	if ( eng ) {
		t[0] = t[1];
		t[1] = t[2];
		t[2] = t[0];
	}

	var day = parseInt( t[1], 10 );
	var month = parseInt( t[2], 10 );
	var year = parseInt( t[3], 10 );

	if ( year < 0 )  return null;
	if ( year < 1000 ) year += 2000;

	var days = this.getDaysInMonth( month, year );
	if ( days == 0 ) return null;
	if ( day < 1 || day > days ) return null;

	return { "day": day, "month": month, "year": year };
};

CALENDAR.validateAndParseTime = function( d ) {
	var t = /(?:\s|^)(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?\s*$/i.exec( d );
	if ( !t ) return null;
	var hours = parseInt( t[1], 10 );
	if ( hours > 23 ) return null;

	var mins = parseInt( t[2], 10 );
	if ( mins > 59 ) return null;

	var secs = t[3] ? parseInt( t[3], 10 ) : null;
	if ( secs > 59 ) return null;

	return { "hours": hours, "mins": mins, "secs": secs };
};

CALENDAR.prototype = {
	build: function( container, hidden ) {
		var self = this;
		if ( !container ) return;
		this.container = container;

		var i, j;

		var cc =
			'<div class="cal" style="position: absolute; display:' + ( hidden ? "none" :"inline-block" ) + ';">' +
				'<div class="wp">' +
					'<table cellspacing="1" cellpadding="0" border="0">' +

						//органы управления
						'<tr valign="middle" class="control">' +
							'<td colspan="7" valign="top" align="center" class="cTd">' +
								'<table cellspacing="1" cellpadding="0" class="cSubT">' +
									'<tr valign="middle" align="center" class="cSubTr">' +

										'<td class="lr dec lrm">&#x25C4;</td>' +
										'<td class="month">&#160;</td>' +
										'<td class="lr inc lrm">&#x25BA;</td>' +

										'<td><span class="lr curDate" title="' + CALENDAR.strs[this.lng].setCurDate + '">&#x25CF;</span></td>' +

										'<td class="lr dec lry">&#x25C4;</td>' +
										'<td class="year">&#160;</td>' +
										'<td class="lr inc lry">&#x25BA;</td>' +

									'</tr>' +
								'</table>' +
							'</td>' +
						'</tr>' +

						'<tr valign="middle" align="center" class="dayHdrRow">';
							for ( i = 0; i < 7; i++ ) cc += '<td class="dayHdr"></td>';
			cc +=		'</tr>';

			cc +=		'<tr><td colspan="7" class="dvdr">&#160;</td></tr>';

						for (i = 0; i < 6; i++ ) {
							cc += '<tr valign="middle" align="center" class="dayRow">';
							for ( j = 0; j < 7; j++ ) cc += '<td class="day">&#160;</td>';
							cc += '</tr>';
						}
			cc +=	'</table>' +

					'<div class="time">' +
						'<span class="hours"><div class="val">' + this.hours + '</div><div class="lr up">&#x25B2;</div><div class="lr dn">&#x25BC;</div></span>' +
						'<span class="dvdr">:</span>' +
						'<span class="mins"><div class="val">' + this.mins + '</div><div class="lr up">&#x25B2;</div><div class="lr dn">&#x25BC;</div></span>' +
						'<span class="seconds">' +
							'<span class="dvdr">:</span>' +
							'<span class="secs"><div class="val">' + this.secs + '</div><div class="lr up">&#x25B2;</div><div class="lr dn">&#x25BC;</div></span>' +
						'</span>' +
					'</div>' +

					'<div class="myCover" style="display: none; position: absolute;" />';

					cc += '<div class="mLayer" style="display: none; position: absolute;"><table cellspacing="0" cellpadding="0" border="0">';
					for ( i = 1; i <= 6; i++ ) {
							cc += '<tr>';
							for ( j = 0; j <= 1; j++ ) {
								var month = i + j * 6;
								cc += '<td class="mTd">' + ( ( month < 10 ? "0" : "" ) + month ) + '.&#160;<span>' + CALENDAR.monthNames[this.lng][month - 1] + '</span></td>';
							}
							cc += '</tr>';
					}
					cc += '</table></div>';

					cc += '<div class="yLayer" style="display: none; position: absolute;"><table cellspacing="0" cellpadding="0" border="0">';
						for ( i = -3; i<= 3; i++ ) cc += '<tr><td class="yTd">&#160;</td></tr>';
					cc += '</table></div>' +

				'</div>' +
			'</div>';

		var $co = $( cc );
		cc = undefined;
		this.dom.main = $co[0];

		var noWheel = function( e ) {
			e.cancelBubble = true;
			if ( e.stopPropagation ) e.stopPropagation();
			if ( typeof( e.preventDefault ) != 'undefined' ) e.preventDefault();
			return false;
		};
		if ( this.dom.main.addEventListener ) this.dom.main.addEventListener( "DOMMouseScroll", noWheel, false );
		this.dom.main.onmousewheel = noWheel;

		var $o = $co.find( ".wp table:first" );

		var wheel = function( e ) { return self.wheel( e ); };
		if ( $o[0].addEventListener ) $o[0].addEventListener( "DOMMouseScroll", wheel, false );
		$o[0].onmousewheel = wheel;

		$o = $co.find( ".lrm" );
		$o.click( function() { self.monthInc( this.className.indexOf( "dec" ) >= 0 ? -1 : 1 ) } );

		$o = $co.find( ".month" );
		this.dom.month = $o[0];
		$o.mouseover( function() { if ( self.dom.monthsLayer.style.display == "none" ) $( this ).addClass( "monthS" ); return false; } )
			.mouseout( function() { if ( self.dom.monthsLayer.style.display == "none" ) $( this ).removeClass( "monthS" ); return false; } )
			.click( function() { self.monthClick(); } );

		$o = $co.find( ".lry" );
		$o.click( function() { self.yearInc( this.className.indexOf( "dec" ) >= 0 ? -1 : 1 ) } );


		$o = $co.find( ".year" );
		this.dom.year = $o[0];
		$o.mouseover( function() { if ( self.dom.yearsLayer.style.display == "none" ) $( this ).addClass( "yearS" ); return false; } )
			.mouseout( function() { if ( self.dom.yearsLayer.style.display == "none" ) $( this ).removeClass( "yearS" ); return false; } )
			.click( function() { self.yearClick(); } );

		$co.find( ".curDate" ).click( function() {
			var cd = CALENDAR.getCurDate();
			if ( self.showTime ) self.fill( cd.month, cd.year, cd.hours, cd.mins, cd.secs, cd.day, cd.month, cd.year );
			else self.fill( cd.month, cd.year, null, null, null, cd.day, cd.month, cd.year );
			if ( self.userHandler ) self.userHandler( self, "day", cd.month, cd.year, cd.hours, cd.mins, cd.secs, cd.day, cd.month, cd.year );
		} );

		$o = $co.find( ".dayHdrRow" );
		this.dom.hdrRow = $o[0];

		this.cells = [];
		$co.find( ".dayRow" ).each(
			function( i, iel ) {
				self.cells[i] = [];
				$( iel ).find( ".day" ).each(
					function( j, jel ) {
						self.cells[i][j] = { dom: jel };
						$( jel ).mouseover( function() { $( this ).addClass( "selDay" ); } )
							.mouseout( function() { $( this ).removeClass( "selDay" ); } )
							.click( function() { self.dayClick( this ) } );
					}
				);
			}
		);

		$o = $co.find( ".myCover" );
		this.dom.coverLayer = $o[0];
		$o.mouseover( function() { return false; } )
			.mouseout( function() { return false; } )
			.click( function() { self.hideAllLayers(); return false; } );

		$o = $co.find( ".mLayer" );
		this.dom.monthsLayer = $o[0];
		this.dom.monthsTds = $.makeArray( $o.find( "td" ) );

		$o = $co.find( ".mTd" );
		$o.mouseover( function() { $( this ).addClass( "mTdS" ); return false; } )
			.mouseout( function() { $( this ).removeClass( "mTdS" ); return false; } )
			.click( function() {
				self.hideAllLayers();
				self.month = this.month;
				if ( self.userHandler ) self.userHandler( self, "month", self.month, self.year, self.hours, self.mins, self.secs, self.day, self.dayMonth, self.dayYear );
				self.fill( self.month, null, null, null, null, null, null, null );
				return false;
			} );

		$o = $co.find( ".yLayer" );
		this.dom.yearsLayer = $o[0];
		this.dom.yearsTds = $.makeArray( $o.find( "td" ) );

		$o = $co.find( ".yTd" );
		$o.mouseover( function() { $( this ).addClass( "yTdS" ); return false; } )
			.mouseout( function() { $( this ).removeClass( "yTdS" ); return false; } )
			.click( function() {
				self.hideAllLayers();
				self.year = this.year;
				if ( self.userHandler ) self.userHandler( self, "year", self.month, self.year, self.hours, self.mins, self.secs, self.day, self.dayMonth, self.dayYear );
				self.fill( null, self.year, null, null, null, null, null, null );
				return false;
			} );


		$o = $co.find( ".time" );
		this.dom.time = $o[0];
		//$o.click( function() { if ( self.userHandler ) self.userHandler( self, "time", self.month, self.year, self.hours, self.mins, self.secs, self.day, self.dayMonth, self.dayYear ); } );
		this.dom.time.style.display = this.showTime ? "block" : "none";
		this.dom.seconds = $o.find( ".seconds" )[0];
		this.dom.seconds.style.display = this.ssTime ? "inline" : "none";
		this.dom.hours = $o.find( ".hours" )[0];
		this.dom.mins = $o.find( ".mins" )[0];
		this.dom.secs = $o.find( ".secs" )[0];
		this.dom.hoursVal = $o.find( ".hours .val" )[0];
		this.dom.minsVal = $o.find( ".mins .val" )[0];
		this.dom.secsVal = $o.find( ".secs .val" )[0];
		$o.find( ".lr" ).click( function( e ) { self.wheelTime( e, this.parentNode, this.className.indexOf( "up" ) >= 0 ? 1 : -1 ) } );

		var tWheel = function( e ) { return self.wheelTime( e, this, null ); };
		if ( this.dom.hours.addEventListener ) {
			this.dom.hours.addEventListener( "DOMMouseScroll", tWheel, false );
			this.dom.mins.addEventListener( "DOMMouseScroll", tWheel, false );
			this.dom.secs.addEventListener( "DOMMouseScroll", tWheel, false );
		}
		this.dom.hours.onmousewheel = tWheel;
		this.dom.mins.onmousewheel = tWheel;
		this.dom.secs.onmousewheel = tWheel;

		//disable selection on buttons
		$co.find( ".lr" ).attr( "unselectable", "on" ).css( "user-select", "none" ).on( "selectstart", false );

		$co.appendTo( container );
		$o = undefined;
	},

	wheelTime: function( e, o, wheelDelta ) {
		if ( !e ) e = window.event;

		//Если открыты диалоги выбора месяца или года - ничего не делаем
		if (
			( this.dom.yearsLayer && this.dom.yearsLayer.style.display != "none" ) ||
			( this.dom.monthsLayer && this.dom.monthsLayer.style.display != "none" )
		) {
			e.cancelBubble = true;
			if ( e.stopPropagation ) e.stopPropagation();
			if ( typeof( e.preventDefault ) != 'undefined' ) e.preventDefault();
			return false;
		}

		if ( !wheelDelta ) {
			if ( e.wheelDelta ) wheelDelta = e.wheelDelta / 120;
			else if ( e.detail ) wheelDelta = -e.detail / 3;

			e.cancelBubble = true;
			if ( e.stopPropagation ) e.stopPropagation();
			if ( typeof( e.preventDefault ) != 'undefined' ) e.preventDefault();
		}

		wheelDelta = Math.floor( wheelDelta );

		var type;
		if ( o.className.indexOf( "hours" ) >= 0 ) {
			type = "hours";
			this.hours = this.hours + wheelDelta;
			if ( this.hours < 0 ) {
				this.hours = -this.hours % 24;
				if ( this.hours > 0 ) this.hours = 24 - this.hours;
			}
			if ( this.hours > 23 ) {
				this.hours = this.hours % 24;
				if ( this.hours > 0 ) this.hours = 24 - this.hours;
			}
		}
		else if ( o.className.indexOf( "mins" ) >= 0 ) {
			type = "mins";
			this.mins = this.mins + wheelDelta;
			if ( this.mins < 0 ) {
				this.mins = -this.mins % 60;
				if ( this.mins > 0 ) this.mins = 60 - this.mins;
			}
			if ( this.mins > 59 ) {
				this.mins = this.mins % 60;
				if ( this.mins > 0 ) this.mins = 60 - this.mins;
			}
		}
		else {
			type = "secs";
			this.secs = this.secs + wheelDelta;
			if ( this.secs < 0 ) {
				this.secs = -this.secs % 60;
				if ( this.secs > 0 ) this.secs = 60 - this.secs;
			}
			if ( this.secs > 59 ) {
				this.secs = this.secs % 60;
				if ( this.secs > 0 ) this.secs = 60 - this.secs;
			}
		}

		if ( this.userHandler ) this.userHandler( this, type, this.month, this.year, this.hours, this.mins, this.secs, this.day, this.dayMonth, this.dayYear );
		this.fill( null, null, this.hours, this.mins, this.secs, null, null, null, true );

		e.cancelBubble = true;
		if ( e.stopPropagation ) e.stopPropagation();
		if ( typeof( e.preventDefault ) != 'undefined' ) e.preventDefault();
		return false;
	},

	//увеличение / уменьшение месяца на 1 ( direct может быть -1 или + 1 )
	//в случае граничных месяцев происходит перестановка года
	monthInc: function( direct ) {
		this.hideAllLayers();

		this.month += direct < 0 ? -1 : 1;

		if ( this.month <= 0 ) {
			this.month = 12;
			this.year--;
		}
		else if ( this.month > 12 ) {
			this.month = 1;
			this.year++;
		}

		if ( this.userHandler ) this.userHandler( this, "month", this.month, this.year, this.hours, this.mins, this.secs, this.day, this.dayMonth, this.dayYear );
		this.fill( this.month, null, null, null, null, null, null, null );
	},

	//увеличение / уменьшение года на 1 ( direct может быть -1 или + 1 )
	yearInc: function( direct ) {
		this.hideAllLayers();

		this.year += direct;
		if ( this.userHandler ) this.userHandler( this, "year", this.month, this.year, this.hours, this.mins, this.secs, this.day, this.dayMonth, this.dayYear );
		this.fill( null, this.year, null, null, null, null, null, null );
	},

	//обработка события вращения колеса мышки
	//в соответствии увеличение/уменьшение месяца
	wheel: function( e ) {
		//Если открыты диалоги выбора месяца или года - ничего не делаем
		if (
			( this.dom.yearsLayer && this.dom.yearsLayer.style.display != "none" ) ||
			( this.dom.monthsLayer && this.dom.monthsLayer.style.display != "none" )
		) {
			e.cancelBubble = true;
			if ( e.stopPropagation ) e.stopPropagation();
			if ( typeof( e.preventDefault ) != 'undefined' ) e.preventDefault();
			return false;
		}

		if ( !e ) e = window.event;

		var wheelDelta;
		if ( e.wheelDelta ) wheelDelta = e.wheelDelta / 120;
		else if ( e.detail ) wheelDelta = -e.detail / 3;
		this.monthInc( wheelDelta < 0 ? 1 : -1 );

		e.cancelBubble = true;
		if ( e.stopPropagation ) e.stopPropagation();
		if ( typeof( e.preventDefault ) != 'undefined' ) e.preventDefault();
		return false;
	},

	//обработка события щелчка мышкой на годе
	yearClick: function( e ) {
		this.hideAllLayers();
		this.cover( true );

		$( this.dom.year ).trigger( "mouseover" );

		var cd = CALENDAR.getCurDate();
		for ( var i = -3; i <= 3; i++ ) {
			var td = this.dom.yearsTds[i + 3];
			var year = this.year + i;
			td.innerHTML = year;
			td.className =  "yTd" + ( year == cd.year ? " yTdC" : "" );
			td.year = year;
		}

		var s = this.dom.yearsLayer.style;
		s.position = "absolute";
		s.zIndex = this.zIndex + 10;
		s.left = "-10000px";
		s.top = "-10000px";
		s.display = "inline-block";

		var x = 0;
		var o = this.dom.year;
		while ( o.className != "cal" ) {
			if ( o.offsetLeft ) x += o.offsetLeft;
			o = o.offsetParent;
		}

		if ( !this.yearTop ) {
			this.yearLeft = Math.round( $( this.dom.year ).position().left + ( $( this.dom.year ).outerWidth() - $( this.dom.yearsLayer ).outerWidth() ) / 2 );
			this.yearTop = Math.round( $( this.dom.hdrRow ).position().top );
		}
		this.dom.yearsLayer.style.left = this.yearLeft + "px";
		this.dom.yearsLayer.style.top = this.yearTop + "px";

		this.setGlobalEventsHandler( true );

		return false;
	},

	monthClick: function( e ) {
		this.hideAllLayers();
		this.cover( true );

		$( this.dom.month ).trigger( "mouseover" );

		var s = this.dom.monthsLayer.style;
		s.position = "absolute";
		s.zIndex = this.zIndex + 10;
		s.left = "-10000px";
		s.top = "-10000px";
		s.display = "inline-block";

		var cd = CALENDAR.getCurDate();
		for ( var i = 0; i < this.dom.monthsTds.length; i++ ) {
			this.dom.monthsTds[i].month = 1 + ( i >> 1 ) + ( i % 2 ? 6 : 0 );
			this.dom.monthsTds[i].className = "mTd" + ( this.dom.monthsTds[i].month == cd.month ? " mTdC" : "" );
		}

		if ( !this.monthTop ) {
			this.monthLeft = Math.round( $( this.dom.month ).position().left );
			this.monthTop = Math.round( $( this.dom.hdrRow ).position().top );
		}
		this.dom.monthsLayer.style.left = this.monthLeft + "px";
		this.dom.monthsLayer.style.top = this.monthTop + "px";

		this.setGlobalEventsHandler( true );

		return false;
	},

	hideAllLayers: function() {
		if ( this.dom.monthsLayer ) this.dom.monthsLayer.style.display = "none";
		if ( this.dom.yearsLayer ) this.dom.yearsLayer.style.display = "none";
		this.cover( false );

		$( this.dom.year ).trigger( "mouseout" );
		$( this.dom.month ).trigger( "mouseout" );

		this.setGlobalEventsHandler( false );
	},

	cover: function( state ) {
		if ( state ) {
			var s = this.dom.coverLayer.style;
			s.position = "absolute";
			s.zIndex = this.zIndex + 9;
			s.left = "0px";
			s.top =  "0px";
			s.width = this.dom.main.offsetWidth + "px";
			s.height = this.dom.main.offsetHeight + "px";
			s.backgroundColor = "#FFFFFF";
			s.opacity = 0.5;
			s.filter = "alpha(opacity=50)";
			s.cursor = "default";
			s.display = "inline-block";

			this.setGlobalEventsHandler( true );
			return;
		}

		this.dom.coverLayer.style.display = "none";
		this.setGlobalEventsHandler( false );
	},

	dayClick: function( o ) {
		this.day = o.co.day;
		this.dayMonth = o.co.month;
		this.dayYear = o.co.year;
		if ( this.userHandler ) this.userHandler( this, "day", this.dayMonth, this.dayYear, this.hours, this.mins, this.secs, this.day, this.dayMonth, this.dayYear );
		//this.fill( this.dayMonth, this.dayYear, null, null, null, null, null, null );
	},

	setGlobalEventsHandler: function( state ) {
		$( window ).off( "mousedown keydown", this.ghEC );
		$( document ).off( "mousedown keydown", this.ghEC );

		if ( state ) {
			$( window ).on( "mousedown keydown", this.ghEC );
			$( document ).on( "mousedown keydown", this.ghEC );
		}
	},

	//===[ API ]============================================================

	/**
	 * Показать / скрыть календарь
	 *
	 * @param state 	true показать / false - скрыть
	 * @param x			x координата окна календаря относительно документа
	 * @param y			y координата окна календаря относительно документа
	 * @param o			DOM объект, относительно которого требуется показать календарь (может быть не задан)
	 * @param shiftX	Если DOM объект задан - смещение координаты x => x = x + o.x + o.width + shiftX
	 * @param shiftY	Если DOM объект задан - смещение координаты y => y = y + o.y
	 */
	show: function( state, x, y, o, shiftX, shiftY ) {
		var self = this;

		this.hideAllLayers();

		this.dom.main.style.display = "none";

		if ( this.hideOnKeysOrMouse && this.bindGEH ) {
			$( document ).off( "mousedown keyup", this.bindGEH );
			this.bindGEH = null;
		}

		if ( state ) {
			var s = this.dom.main.style;
			s.position = "absolute";
			s.zIndex = this.zIndex;
			s.left = "-10000px";
			s.top = "-10000px";
			s.display = "inline-block";

			if ( o ) {
				var pos = $( o ).offset();
				x += pos.left - o.offsetWidth - shiftX;
				y += pos.top + shiftY;
			}

			s = this.dom.main.style;
			s.left = x + "px";
			s.top = y + "px";

			if ( this.hideOnKeysOrMouse ) {
				this.bindGEH = function( e ) {
					if ( e.type == "keyup" && e.which != 27 ) return;
					if ( e.type == "mousedown" && ( e.target == o || $.contains( self.dom.main, e.target ) ) ) return;

					self.show( false );
				};
				$( document ).on( "mousedown keyup", this.bindGEH );
			}
		}
	},

	/**
	 * Перебрать все dom ячейки дат календаря
	 *
	 * @param handler	функция вида function( dom, day, month, year ) {}, которая будет вызвана на каждую ячейку
	 */
	cellsRun: function( handler ) {
		for ( var i = 0; i < 6; i++ ) {
			for ( var j = 0; j < 7; j++ ) {
				var cl = this.cells[i][j];
				handler( cl.dom, cl.day, cl.month, cl.year );
			}
		}
	},

	/**
	 * Установить дату и(или) время и(или) выбранную дату календаря
	 * если любой из параметров undefined - он пропускается (не устанавливается)
	 *
	 * @param refresh	true для обновления календаря после всех установок
	 * @param month		месяц календаря
	 * @param year		год календаря
	 * @param hours		часы
	 * @param mins		минуты
	 * @param secs		секунды
	 * @param day		выбранный день (число)
	 * @param dayMonth	месяц выбранного дня
	 * @param dayYear	год выбранного дня
	 */
	set: function( refresh, month, year, hours, mins, secs, day, dayMonth, dayYear ) {
		if ( month !== undefined )		this.month = month;
		if ( year !== undefined )		this.year = year;
		if ( hours !== undefined )		this.hours = hours;
		if ( secs !== undefined )		this.secs = secs;
		if ( day !== undefined )		this.day = day;
		if ( dayMonth !== undefined )	this.dayMonth = dayMonth;
		if ( dayYear !== undefined )	this.dayYear = dayYear;

		if ( refresh ) this.fill();
	},

	/**
	 * Получить данные календаря
	 *
	 * @returns {
	 *
	 * 	{
	 * 		lng: *,				текущий язык
	 * 		mhFirst: *,			идет ли месяц первым в дате число вида мм_дд_гг
	 * 		suFirst: *,			true, если первый день недели воскресенье
	 * 		showTime: *,		true, если календарь со временем
	 * 		ssTime: *,	true, если во времени есть секунды
	 * 		month: *,			месяц календаря
	 * 		year: *,			год календаря
	 * 		hours: *,			часы
	 * 		mins: *,			минуты
	 * 		secs: *,			секунды
	 * 		day: *,				выбранный день
	 * 		dayMonth: *,		месяц выбранного дня
	 * 		dayYear: *			год выбранного дня
	 * 	}
	 *
	 * 	}
	 */
	get: function() {
		return {
			lng:		this.lng,
			mhFirst:	this.mhFirst,
			suFirst:	!this.moFirst,
			showTime:	this.showTime,
			ssTime:this.ssTime,
			month:		this.month,
			year:		this.year,
			hours:		this.hours,
			mins:		this.mins,
			secs:		this.secs,
			day:		this.day,
			dayMonth:	this.dayMonth,
			dayYear:	this.dayYear
		};
	},

	/**
	 * Получить строку с датой согласно установленным параметрам
	 *
	 * @dt object { day: *, month: *, year: *, hours: *, mins: *, secs: * }	объект с данными даты, если не указан - вернется текущая
	 * @returns string
	 */
	getDateAsText: function( dt ) {
		if ( !dt ) dt = CALENDAR.getCurDate();
		var v = this.mhFirst ?
			( dt.month < 10 ? "0" : "" ) + dt.month +  "." + ( dt.day < 10 ? "0" : "" ) + dt.day + "." + dt.year :
			( dt.day < 10 ? "0" : "" ) + dt.day +  "." + ( dt.month < 10 ? "0" : "" ) + dt.month + "." + dt.year;

		if ( this.showTime ) {
			v += " " + ( dt.hours < 10 ? "0" : "" ) + dt.hours + ":" + ( dt.mins < 10 ? "0" : "" ) + dt.mins;
			if ( this.ssTime ) v += ":" + ( dt.secs < 10 ? "0" : "" ) + dt.secs;
		}

		return v;
	},

	/**
	 * Заполнить (обновить) календарь
	 *
	 * если какая-либо переменная = undefined - если она уже задана в каленадре - она возьмется из него,
	 * иначе будет взята из текущей даты
	 *
	 * если кака-либо перменная = null, она и будет являться null
	 *
	 * @param month		месяц календаря
	 * @param year		год календаря
	 * @param hours		часы
	 * @param mins		минуты
	 * @param secs		секунды
	 * @param day		выбранный день (число)
	 * @param dayMonth	месяц выбранного дня
	 * @param dayYear	год выбранного дня
	 * @param onlyTime	true, если менять только время, игнорируя данные даты
	 */
	fill: function( month, year, hours, mins, secs, day, dayMonth, dayYear, onlyTime ) {
		if ( !this.container || !this.cells ) return;

		var cd = CALENDAR.getCurDate();

		if ( hours == undefined || mins == undefined ) {
			if ( this.hours !== null && this.mins !== null ) {
				hours = this.hours;
				mins  = this.mins;
			}
			else {
				hours = cd.hours;
				mins  = cd.mins;
			}

			if ( this.ssTime ) {
				if ( this.secs !== null ) secs  = this.secs;
				else secs  = cd.secs;
			}
			else this.secs = null;
		}

		this.hours = hours;
		this.mins = mins;
		this.secs = secs;

		if ( !onlyTime ) {
			if ( !day ) {
				if ( this.day ) {
					day = this.day;
					dayMonth = this.dayMonth;
					dayYear = this.dayYear;
				}
/*
				else {
					day = cd.day;
					dayMonth = cd.month;
					dayYear = cd.year;
				}
*/
			}
			if ( !month || !year ) {
				if ( this.month !== null && this.year !== null ) {
					month = this.month;
					year  = this.year;
				}
				else {
					month = cd.month;
					year  = cd.year;
				}
			}

			this.day = day;
			this.dayMonth = dayMonth;
			this.dayYear = dayYear;

			this.year = year;
			this.month = month;

			var i;
			for ( i = 1; i <= 7; i++ ) {
				this.dom.hdrRow.childNodes[i-1].className = "dayHdr" + ( CALENDAR.isHoliday( i, this.moFirst ) ? " holiDayHdr" : "" );
				this.dom.hdrRow.childNodes[i-1].innerHTML = CALENDAR.dayNames[this.lng][ CALENDAR.getShiftByNum( i, this.moFirst ) ];
			}

			var row = 0;
			var col = 0;

			var count = 0;
			var cmwd = CALENDAR.getWeekDay( 1, this.month, this.year, this.moFirst );

			this.dom.month.className = "month" + ( cd.month == this.month ? " monthC" : "" );
			this.dom.year.className = "year" + ( cd.year == this.year ? " yearC" : "" );

			this.dom.year.innerHTML = this.year;
			this.dom.month.innerHTML = CALENDAR.monthNames[this.lng][ this.month - 1 ];

			while ( true ) {
				var acname = "day";
				count++;

				if ( count <= cmwd ) {
					if ( this.month == 1 ) {
						month = 12;
						year = this.year - 1;
					}
					else {
						month = this.month - 1;
						year = this.year;
					}

					acname += " aMonDay";
					day = CALENDAR.getDaysInMonth( month, year ) - cmwd + count
				}
				else if ( count > cmwd + CALENDAR.getDaysInMonth( this.month, this.year ) ) {
					if ( this.month == 12 ) {
						month = 1;
						year = this.year + 1;
					}
					else {
						month = this.month + 1;
						year = this.year;
					}

					acname += " aMonDay";
					day = count - cmwd - CALENDAR.getDaysInMonth( this.month, this.year );
				}
				else {
					month = this.month;
					year = this.year;
					day = count - cmwd;
				}

				acname += " " + ( CALENDAR.isHoliday( col + 1, this.moFirst ) ? "holiDay" : "workDay" );
				if ( day == cd.day && month == cd.month && year == cd.year ) acname += " curDay";
				if ( day == this.day && month == this.dayMonth && year == this.dayYear ) acname += " marked";

				this.cells[row][col]["dom"].className = acname;
				this.cells[row][col]["dom"].innerHTML = day;

				this.cells[row][col]["year"] = year;
				this.cells[row][col]["month"] = month;
				this.cells[row][col]["day"] = day;

				this.cells[row][col]["dom"].co = this.cells[row][col];


				col++;
				if ( col > 6 ) {
					col = 0;
					row++;
					if ( row >= 6 ) break;
				}
			}
		}

		if ( this.showTime ) {
			this.dom.hoursVal.innerHTML =  this.hours ? ( ( this.hours < 10 ? "0" : "" ) + this.hours ) : "00";
			this.dom.minsVal.innerHTML = this.mins ? ( ( this.mins < 10 ? "0" : "" ) + this.mins ) : "00";
			if ( this.ssTime ) this.dom.secsVal.innerHTML = this.secs ? ( ( this.secs < 10 ? "0" : "" ) + this.secs ) : "00";
		}

		if ( this.userHandler ) this.userHandler( this, "filled", this.month, this.year, this.hours, this.mins, this.secs, this.day, this.dayMonth, this.dayYear );
	}
};

/**
 * Создать календарь и прекрепить его к полю ввода
 */
CALENDAR.bind = (function() {
	var list = [];

	/**
	 * @param	o			DOM поля ввода
	 * @param	options		опции
	 */
	return function( o, options ) {
/*		options = {
			shiftX			- смещение по x относительно правого верхнего угла поля ввода
			shiftY			- смещение по y относительно верха поля ввода
			mhFirst			- true, если дата вида мм_дд_гг, по-умолчанию false
			suFirst			- true, если неделя начинается с воскресения, по-умолчанию false
			lng				- язык календаря rus или eng, по-умолачнию rus
			zIndex			- zIndex окна календаря, по-умолчанию 5000
			showTime		- true если календарь со временем, по-умолчанию false
			ssTime			- true если время с секундами, по-умолчанию false
			y4				- true для года из 4 цифр, по-умолчанию false
		}
*/

		if ( !options ) options = {};

		var y4 = options.y4;

		var cal = new CALENDAR(
			document.body,
			{
				hidden:				true,
				hideOnKeysOrMouse:	true,
				mhFirst:			options.mhFirst,
				suFirst:			options.suFirst,
				lng:				options.lng,
				zIndex:				options.zIndex,
				showTime:			options.showTime,
				ssTime:		options.ssTime,
				userHandler:		function( c, type, month, year, hours, mins, secs, day, dayMonth, dayYear ) {
					var d, m, y, hs, ms, ss, v;

					if ( type == "day" || type == "time" || type == "hours" || type == "mins" || type == "secs" ) {
						if ( day ) {
							d = ( day < 10 ? "0" : "" ) + day;
							m = ( dayMonth < 10 ? "0" : "" ) + dayMonth;

							y = y4 ? dayYear : ( dayYear >= 2000 ? dayYear - 2000 : dayYear - 1900 );

							if ( y < 10 ) y = "0" + y;
							if ( cal.mhFirst ) v = m +  "." + d + "." + y;
							else v = d +  "." + m + "." + y;

							if ( cal.showTime ) {
								hs = ( hours < 10 ? "0" : "" ) + hours;
								ms = ( mins < 10 ? "0" : "" ) + mins;
								ss = ( secs < 10 ? "0" : "" ) + secs;
								if ( v ) v += " ";
								v += hs + ":" + ms;
								if ( cal.ssTime ) v += ":" + ss;
							}

							o.value = v;
							$( o ).trigger( "change" );

							if ( type == "day" ) c.fill( month, year, null, null, null, null, null, null );
						}
					}
				}
			}
		);
		cal.bindO = o;
		cal.bindShiftX = "shiftX" in options ? options.shiftX : 3;
		cal.bindShiftY = "shiftY" in options ? options.shiftY : 5;

		var ignoreBlur = false;
		$( cal.dom.main ).find( ".lrm, .lry, .month, .year, .curDate, .day, .myCover, .mTd, .yTd, .lr" ).mousedown( function() {
			ignoreBlur = true;
		} );

		$( o ).bind(
			"blur focus mousedown keyup",
			function( e ) {
				if ( e.type == "blur" ) {
					if ( !ignoreBlur ) cal.show( false );
					ignoreBlur = false;
/* Можно обойтись без ignoreBlur, но работает только в Firefox:
					var focused = e.originalEvent.explicitOriginalTarget;
					if ( !( cal.dom.main == focused || $.contains( cal.dom.main, focused ) ) ) cal.show( false );
*/
					return;
				}

				var d, cd, fd, t, i, force = false;

				if ( cal.dom.main.style.display == "none" ) {
					for ( i = 0; i < list.length; i++ ) list[i].cal.show( false );
					cal.show( true, 0, 0, cal.bindO, cal.bindShiftX, cal.bindShiftY );
				}

				cd = CALENDAR.getCurDate();
				fd = { month: cd.month, year: cd.year, hours: cd.hours, mins: cd.mins, secs: cd.secs, day: cd.day, dayMonth: cd.month, dayYear: cd.year };
				d = CALENDAR.validateAndParseDate( o.value, cal.mhFirst );
				if ( d ) {
					fd.month = d.month;
					fd.year = d.year;
					fd.day = d.day;
					fd.dayMonth = d.month;
					fd.dayYear = d.year;
				}
				else {
					fd.day = null;
					fd.dayMonth = null;
					fd.dayYear = null;

					if ( cal.day !== null ) {
						cal.day = null;
						cal.dayMonth = null;
						cal.dayYear = null;

						force = false;
					}

					if ( cal.month !== null && cal.year !== null ) {
						fd.month = cal.month;
						fd.year = cal.year;
					}
				}

				if ( cal.showTime ) {
					t = CALENDAR.validateAndParseTime( o.value );
					if ( t ) {
						fd.hours = t.hours;
						fd.mins = t.mins;
						fd.secs = cal.ssTime ? ( t.secs ? t.secs : 0 ) : null;
					}
					else {
						if ( cal.hours !== null && cal.mins !== null ) {
							fd.hours = cal.hours;
							fd.mins = cal.mins;
							fd.secs = cal.secs;
						}
					}

					if (
						( fd.day != cal.day || fd.dayMonth != cal.month || fd.dayYear != cal.dayYear ) ||
						( fd.month != cal.month || fd.year != cal.year ) ||
						( fd.hours != cal.hours || fd.mins != cal.mins ) ||
						( cal.ssTime && fd.secs != cal.secs )
					) cal.fill( fd.month, fd.year, fd.hours, fd.mins, fd.secs, fd.day, fd.dayMonth, fd.dayYear );
				}
				else if (
							force ||
							( fd.day != cal.day || fd.dayMonth != cal.month || fd.dayYear != cal.dayYear ) ||
							( fd.month != cal.month || fd.year != cal.year )
				) cal.fill( fd.month, fd.year, null, null, null, fd.day, fd.dayMonth, fd.dayYear );
			}
		);

		list.push( { "o": o, "cal": cal } );

		options = undefined;
	};
})();
