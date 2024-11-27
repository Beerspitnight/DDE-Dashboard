// Statistical analysis utilities for i-Ready math data
const calculateStatistics = (data) => {
    const stats = {
      timeAnalysis: {
        optimal: {
          range: '30-49',
          passRate: 0,
          count: 0
        },
        ranges: {
          '1-9': { count: 0, avgPassRate: 0 },
          '10-29': { count: 0, avgPassRate: 0 },
          '30-49': { count: 0, avgPassRate: 0 },
          '50+': { count: 0, avgPassRate: 0 }
        }
      },
      courseTypeAnalysis: {
        Standard: { avgTime: 0, avgPassRate: 0, count: 0, timeVariance: 0 },
        Accelerated: { avgTime: 0, avgPassRate: 0, count: 0, timeVariance: 0 },
        Honors: { avgTime: 0, avgPassRate: 0, count: 0, timeVariance: 0 }
      },
      achievementGap: {
        highEngagement: { passRate: 0, count: 0 },
        lowEngagement: { passRate: 0, count: 0 },
        gap: 0
      },
      correlations: {
        timeVsPerformance: 0
      }
    };
  
    // Process each data point
    data.forEach(record => {
      // Time range analysis
      const timeRange = getTimeRange(record.avgTime);
      stats.timeAnalysis.ranges[timeRange].count++;
      stats.timeAnalysis.ranges[timeRange].avgPassRate += record.passRate;
  
      // Course type analysis
      const courseStats = stats.courseTypeAnalysis[record.courseType];
      courseStats.count++;
      courseStats.avgTime += record.avgTime;
      courseStats.avgPassRate += record.passRate;
      
      // Achievement gap analysis
      if (record.avgTime >= 30) {
        stats.achievementGap.highEngagement.count++;
        stats.achievementGap.highEngagement.passRate += record.passRate;
      } else {
        stats.achievementGap.lowEngagement.count++;
        stats.achievementGap.lowEngagement.passRate += record.passRate;
      }
    });
  
    // Calculate averages and final statistics
    Object.keys(stats.timeAnalysis.ranges).forEach(range => {
      const rangeStats = stats.timeAnalysis.ranges[range];
      if (rangeStats.count > 0) {
        rangeStats.avgPassRate /= rangeStats.count;
      }
    });
  
    Object.keys(stats.courseTypeAnalysis).forEach(courseType => {
      const courseStats = stats.courseTypeAnalysis[courseType];
      if (courseStats.count > 0) {
        courseStats.avgTime /= courseStats.count;
        courseStats.avgPassRate /= courseStats.count;
      }
    });
  
    // Calculate achievement gap
    if (stats.achievementGap.highEngagement.count > 0) {
      stats.achievementGap.highEngagement.passRate /= stats.achievementGap.highEngagement.count;
    }
    if (stats.achievementGap.lowEngagement.count > 0) {
      stats.achievementGap.lowEngagement.passRate /= stats.achievementGap.lowEngagement.count;
    }
    stats.achievementGap.gap = 
      stats.achievementGap.highEngagement.passRate - 
      stats.achievementGap.lowEngagement.passRate;
  
    // Calculate time-performance correlation
    stats.correlations.timeVsPerformance = calculateCorrelation(
      data.map(d => d.avgTime),
      data.map(d => d.passRate)
    );
  
    return stats;
  };
  
  // Helper function to calculate correlation coefficient
  const calculateCorrelation = (x, y) => {
    const n = x.length;
    const sum1 = sum(x);
    const sum2 = sum(y);
    const sum1Sq = sum(x.map(x => x * x));
    const sum2Sq = sum(y.map(y => y * y));
    const pSum = sum(x.map((x, i) => x * y[i]));
    const num = pSum - (sum1 * sum2 / n);
    const den = Math.sqrt((sum1Sq - sum1 * sum1 / n) * (sum2Sq - sum2 * sum2 / n));
    return num / den;
  };
  
  // Helper function for summation
  const sum = arr => arr.reduce((a, b) => a + b, 0);
  
  // Helper function to determine time range
  const getTimeRange = (time) => {
    if (time < 10) return '1-9';
    if (time < 30) return '10-29';
    if (time < 50) return '30-49';
    return '50+';
  };
  
  export { calculateStatistics };