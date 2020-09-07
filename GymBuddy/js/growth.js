
window.addEventListener('load', () => {

  let chartConfig = {
    type: 'line',
    globals: {
      fontFamily: 'Segoe UI',
      fontSize: '14px'
    },
    title: {
      text: 'Weight Moved',
      fontSize: '20px',
      padding: '20px'
    },

    plot: {
      tooltip: {

        text: '%plot-text %kl you moved %vKgs',
        padding: '10 15',
        borderRadius: '50px',
        borderWidth: '0px',
        htmlMode: true
      },

      animation: {
        effect: 'ANIMATION_EXPAND_HORIZONTAL',
        method: 'ANIMATION_LINEAR',
        sequence: 'ANIMATION_BY_PLOT',
        speed: 575
      },
      lineWidth: '3px',
      marker: {
        borderWidth: '0px',
        size: '6px'
      }
    },
    scaleX: {
      // label: {
      //   text: 'Days'
      // },
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    scaleY: {
      // label: {
      //   text: 'Weight Moved'
      // }
    },
    crosshairX: {
      plotLabel: {
        padding: '10px 15px',
        borderRadius: '20px'
      }
    },
    series: [
      {
        text: 'Week 1',
        values: [300, 310, 307, 0, 301, 320, 0],
        lineColor: '#FD063C',
        marker: {
          backgroundColor: '#FD063C'
        }
      },
      {
        text: 'Week 2',
        values: [305, 320, 360, 300, 300, 360, 0],
        lineColor: '#091921',
        marker: {
          backgroundColor: '#091921'
        }
      },

    ]
  };
  let chartConfig2 = {
    type: 'line',
    globals: {
      fontFamily: 'Segoe UI',
      fontSize: '14px'
    },
    title: {
      text: 'Hours per Day trained',
      fontSize: '20px',
      padding: '20px'
    },

    plot: {
      tooltip: {

        text: '%plot-text %kl you worked out %vhrs',
        padding: '10 15',
        borderRadius: '50px',
        borderWidth: '0px',
        htmlMode: true
      },

      animation: {
        effect: 'ANIMATION_EXPAND_HORIZONTAL',
        method: 'ANIMATION_LINEAR',
        sequence: 'ANIMATION_BY_PLOT',
        speed: 575
      },
      lineWidth: '3px',
      marker: {
        borderWidth: '0px',
        size: '6px'
      }
    },
    scaleX: {
      // label: {
      //   text: 'Days'
      // },
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    scaleY: {
      // label: {
      //   text: 'Weight Moved'
      // }
    },
    crosshairX: {
      plotLabel: {
        padding: '10px 15px',
        borderRadius: '20px'
      }
    },
    series: [
      {
        text: 'Week 1',
        values: [3, 2.5, 3, 0, 3, 3, 0],
        lineColor: '#FD063C',
        marker: {
          backgroundColor: '#FD063C'
        }
      },
      {
        text: 'Week 2',
        values: [3.2, 3.5, 4, 3.6, 3.4, 4, 0],
        lineColor: '#091921',
        marker: {
          backgroundColor: '#091921'
        }
      },

    ]
  };
  zingchart.render({
    id: 'myChart',
    data: chartConfig,
    height: '100%',
    width: '100%'
  });
  zingchart.render({
    id: 'myChart2',
    data: chartConfig2,
    height: '100%',
    width: '100%'
  });
});

var month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
var weekdayShort = [
  "sun",
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat"
];
var monthDirection = 0;

function getNextMonth() {
  monthDirection++;
  var current;
  var now = new Date();
  if (now.getMonth() == 11) {
    current = new Date(now.getFullYear() + monthDirection, 0, 1);
  } else {
    current = new Date(now.getFullYear(), now.getMonth() + monthDirection, 1);
  }
  initCalender(getMonth(current));
}

function getPrevMonth() {
  monthDirection--;
  var current;
  var now = new Date();
  if (now.getMonth() == 11) {
    current = new Date(now.getFullYear() + monthDirection, 0, 1);
  } else {
    current = new Date(now.getFullYear(), now.getMonth() + monthDirection, 1);
  }
  initCalender(getMonth(current));
}
Date.prototype.isSameDateAs = function (pDate) {
  return (
    this.getFullYear() === pDate.getFullYear() &&
    this.getMonth() === pDate.getMonth() &&
    this.getDate() === pDate.getDate()
  );
};

function getMonth(currentDay) {
  var now = new Date();
  var currentMonth = month[currentDay.getMonth()];
  var monthArr = [];
  for (i = 1 - currentDay.getDate(); i < 31; i++) {
    var tomorrow = new Date(currentDay);
    tomorrow.setDate(currentDay.getDate() + i);
    if (currentMonth !== month[tomorrow.getMonth()]) {
      break;
    } else {
      monthArr.push({
        date: {
          weekday: weekday[tomorrow.getDay()],
          weekday_short: weekdayShort[tomorrow.getDay()],
          day: tomorrow.getDate(),
          month: month[tomorrow.getMonth()],
          year: tomorrow.getFullYear(),
          current_day: now.isSameDateAs(tomorrow) ? true : false,
          date_info: tomorrow
        }
      });
    }
  }
  return monthArr;
}
function clearCalender() {
  $("table tbody tr").each(function () {
    $(this).find("td").removeClass("active selectable currentDay between hover").html("");
  });
  $("td").each(function () {
    $(this).unbind('mouseenter').unbind('mouseleave');
  });
  $("td").each(function () {
    $(this).unbind('click');
  });
  clickCounter = 0;
}

function initCalender(monthData) {
  var row = 0;
  var classToAdd = "";
  var currentDay = "";
  var today = new Date();

  clearCalender();
  $.each(monthData,
    function (i, value) {
      var weekday = value.date.weekday_short;
      var day = value.date.day;
      var column = 0;
      var index = i + 1;

      $(".sideb .header .month").html(value.date.month);
      $(".sideb .header .year").html(value.date.year);
      if (value.date.current_day) {
        currentDay = "currentDay";
        classToAdd = "selectable";
        $(".right-wrapper .header span").html(value.date.weekday);
        $(".right-wrapper .day").html(value.date.day);
        $(".right-wrapper .month").html(value.date.month);
      }
      if (today.getTime() < value.date.date_info.getTime()) {
        classToAdd = "selectable";

      }
      $("tr.weedays th").each(function () {
        var row = $(this);
        if (row.data("weekday") === weekday) {
          column = row.data("column");
          return;
        }
      });
      $($($($("tr.days").get(row)).find("td").get(column)).addClass(classToAdd + " " + currentDay).html(day));
      currentDay = "";
      if (column == 6) {
        row++;
      }
    });
  $("td.selectable").click(function () {
    dateClickHandler($(this));
  });
}
initCalender(getMonth(new Date()));

var clickCounter = 0;
$(".fa-angle-double-right").click(function () {
  $(".right-wrapper").toggleClass("is-active");
  $(this).toggleClass("is-active");
});


$(".fa-angle-left").click(function () {
  getPrevMonth();
  $(".main").addClass("is-rotated-left");
  setTimeout(function () {
    $(".main").removeClass("is-rotated-left");
  }, 195);
});

$(".fa-angle-right").click(function () {
  getNextMonth();
  $(".main").addClass("is-rotated-right");
  setTimeout(function () {
    $(".main").removeClass("is-rotated-right");
  }, 195);
});