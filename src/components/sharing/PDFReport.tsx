import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from '@react-pdf/renderer';
import type { CalculatorInputs, CalculatorOutputs } from '../../types/calculator';
import {
  formatCurrency,
  formatPercent,
  formatHours,
  formatBreakeven,
  formatFTE,
} from '../../lib/formatters';

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
    color: '#1E293B',
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: '#F97316',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#1E293B',
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: '#E2E8F0',
  },
  heroMetric: {
    backgroundColor: '#EEF2FF',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  heroLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  heroValue: {
    fontSize: 32,
    fontFamily: 'Helvetica-Bold',
    color: '#F97316',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  metricCard: {
    width: '50%',
    padding: 8,
  },
  metricCardInner: {
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 6,
  },
  metricLabel: {
    fontSize: 10,
    color: '#64748B',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#1E293B',
  },
  table: {
    marginTop: 8,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tableRowHeader: {
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 2,
    borderBottomColor: '#E2E8F0',
  },
  tableCell: {
    flex: 1,
    paddingHorizontal: 8,
  },
  tableCellHeader: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    color: '#64748B',
  },
  tableCellValue: {
    fontSize: 11,
    color: '#1E293B',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 12,
  },
  footerText: {
    fontSize: 9,
    color: '#64748B',
  },
  methodology: {
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  methodologyTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 8,
  },
  methodologyText: {
    fontSize: 9,
    color: '#64748B',
    lineHeight: 1.4,
  },
  positive: {
    color: '#F97316',
  },
  negative: {
    color: '#6366F1',
  },
});

interface PDFReportProps {
  inputs: CalculatorInputs;
  outputs: CalculatorOutputs;
}

function ROIReportDocument({ inputs, outputs }: PDFReportProps) {
  const { time, financial, roi, organisation } = outputs;
  const isPositive = financial.annualNetSavings >= 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Voice Dictation ROI Report</Text>
          <Text style={styles.subtitle}>
            Generated on {new Date().toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </Text>
        </View>

        {/* Hero Metric */}
        <View style={styles.heroMetric}>
          <Text style={styles.heroLabel}>Annual Net Savings</Text>
          <Text style={[styles.heroValue, isPositive ? styles.positive : styles.negative]}>
            {isPositive ? '↑ ' : '↓ '}
            {formatCurrency(Math.abs(financial.annualNetSavings))}
          </Text>
        </View>

        {/* Key Metrics Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <View style={styles.metricCardInner}>
                <Text style={styles.metricLabel}>ROI</Text>
                <Text style={[styles.metricValue, roi.annualROIPercent >= 0 ? styles.positive : styles.negative]}>
                  {formatPercent(roi.annualROIPercent, 0)}
                </Text>
              </View>
            </View>
            <View style={styles.metricCard}>
              <View style={styles.metricCardInner}>
                <Text style={styles.metricLabel}>Time to Breakeven</Text>
                <Text style={styles.metricValue}>{formatBreakeven(roi.monthsToBreakeven)}</Text>
              </View>
            </View>
            <View style={styles.metricCard}>
              <View style={styles.metricCardInner}>
                <Text style={styles.metricLabel}>Annual Hours Saved</Text>
                <Text style={styles.metricValue}>{formatHours(time.annualHoursSavedTotal)}</Text>
              </View>
            </View>
            <View style={styles.metricCard}>
              <View style={styles.metricCardInner}>
                <Text style={styles.metricLabel}>FTE Equivalent</Text>
                <Text style={styles.metricValue}>{formatFTE(organisation.effectiveEmployeesEquivalent)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Time Savings Table */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Time Savings Per Person</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableRowHeader]}>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellHeader}>Period</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellHeader}>Hours Saved</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellValue}>Daily</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellValue}>{formatHours(time.dailyHoursSavedPerPerson)}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellValue}>Weekly</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellValue}>{formatHours(time.weeklyHoursSavedPerPerson)}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellValue}>Monthly</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellValue}>{formatHours(time.monthlyHoursSavedPerPerson)}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellValue}>Annually</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={[styles.tableCellValue, { fontFamily: 'Helvetica-Bold' }]}>
                  {formatHours(time.annualHoursSavedPerPerson)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* 3-Year Projection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3-Year Financial Projection</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <View style={styles.metricCardInner}>
                <Text style={styles.metricLabel}>Total Investment</Text>
                <Text style={styles.metricValue}>{formatCurrency(roi.threeYearTotalInvestment)}</Text>
              </View>
            </View>
            <View style={styles.metricCard}>
              <View style={styles.metricCardInner}>
                <Text style={styles.metricLabel}>Total Savings</Text>
                <Text style={styles.metricValue}>{formatCurrency(roi.threeYearTotalSavings)}</Text>
              </View>
            </View>
            <View style={styles.metricCard}>
              <View style={styles.metricCardInner}>
                <Text style={styles.metricLabel}>Net Benefit</Text>
                <Text style={[styles.metricValue, roi.threeYearNetBenefit >= 0 ? styles.positive : styles.negative]}>
                  {formatCurrency(roi.threeYearNetBenefit)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Assumptions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Calculation Assumptions</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellValue}>Team Size</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellValue}>{inputs.employees} people</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellValue}>Daily Typing Time</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellValue}>{inputs.typingHoursPerDay} hours</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellValue}>Typing Speed</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellValue}>{inputs.typingSpeedWPM} WPM</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellValue}>Voice Speed</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellValue}>{inputs.voiceSpeedWPM} WPM</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellValue}>Adoption Rate</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellValue}>{inputs.adoptionRatePercent}%</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellValue}>Hourly Cost</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellValue}>£{inputs.labourRatePerHour}/hour</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Methodology Note */}
        <View style={styles.methodology}>
          <Text style={styles.methodologyTitle}>Methodology</Text>
          <Text style={styles.methodologyText}>
            Time savings are calculated based on the speed differential between typing and voice
            dictation, adjusted for adoption rate, accuracy overhead, and proofreading time.
            Financial values represent productivity gains valued at the specified hourly rate,
            minus software and deployment costs.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Generated by Start with Voice ROI Calculator</Text>
          <Text style={styles.footerText}>withvoice.ai</Text>
        </View>
      </Page>
    </Document>
  );
}

export async function generatePDF(inputs: CalculatorInputs, outputs: CalculatorOutputs): Promise<Blob> {
  const doc = <ROIReportDocument inputs={inputs} outputs={outputs} />;
  const blob = await pdf(doc).toBlob();
  return blob;
}

export function downloadPDF(inputs: CalculatorInputs, outputs: CalculatorOutputs): void {
  generatePDF(inputs, outputs).then((blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `voice-dictation-roi-report-${new Date().toISOString().split('T')[0]}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
}
