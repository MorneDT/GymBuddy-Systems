
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
            values: [30, 30, 37, 39, 31, 30, 30],
            lineColor: '#FD063C',
            marker: {
              backgroundColor: '#FD063C'
            }
          },
        {
          text: 'Week 2',
          values: [35, 32, 36, 30, 30, 36, 34],
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
  });
  