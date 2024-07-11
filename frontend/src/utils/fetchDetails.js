export const fetchDetails = (email) => {
    const [enrollNo, ] = email.split('@');
    if (enrollNo.length !== 12) {
      console.error('Invalid enrollment number length');
      return;
    }
  
    const admissionYear = enrollNo.slice(0, 2);
    const clgCode = enrollNo.slice(2, 5);
    const deptCode = enrollNo.slice(7, 9);

      const passoutYear = Number('20' +  admissionYear) + 4;
      let college;
      let department;

      switch (deptCode) {
        case '01':
          department = 'AERONAUTICAL ENGINEERING';
          break;
        case '02':
          department = 'AUTOMOBILE ENGINEERING';
          break;
        case '03':
          department = 'BIO-MEDICAL ENGINEERING';
          break;
        case '04':
          department = 'BIO-TECHNOLOGY';
          break;
        case '05':
          department = 'CHEMICAL ENGINEERING';
          break;
        case '06':
          department = 'CIVIL ENGINEERING';
          break;
        case '07':
          department = 'COMPUTER ENGINEERING';
          break;
        case '08':
          department = 'ELECTRICAL & ELECTRONICS ENGINEERING';
          break;
        case '09':
          department = 'ELECTRICAL ENGINEERING';
          break;
        case '10':
          department = 'ELECTRONICS ENGINEERING';
          break;
        case '11':
          department = 'ELECTRONICS & COMMUNICATION ENGINEERING';
          break;
        case '12':
          department = 'ELECTRONICS & TELECOMMUNICATION ENGINEERING';
          break;
        case '13':
          department = 'ENVIRONMENTAL ENGINEERING';
          break;
        case '14':
          department = 'FOOD PROCESSING TECHNOLOGY';
          break;
        case '15':
          department = 'INDUSTRIAL ENGINEERING';
          break;
        case '16':
          department = 'INFORMATION TECHNOLOGY';
          break;
        case '17':
          department = 'INSTRUMENTATION & CONTROL ENGINEERING';
          break;
        case '18':
          department = 'MARINE ENGINEERING';
          break;
        case '19':
          department = 'MECHANICAL ENGINEERING';
          break;
        case '20':
          department = 'MECHATRONICS ENGINEERING';
          break;
        case '21':
          department = 'METALLURGY ENGINEERING';
          break;
        case '22':
          department = 'MINING ENGINEERING';
          break;
        case '23':
          department = 'PLASTIC TECHNOLOGY';
          break;
        case '24':
          department = 'POWER ELECTRONICS';
          break;
        case '25':
          department = 'PRODUCTION ENGINEERING';
          break;
        case '26':
          department = 'RUBBER TECHNOLOGY';
          break;
        case '28':
          department = 'TEXTILE PROCESSING';
          break;
        case '29':
          department = 'TEXTILE TECHNOLOGY';
          break;
        case '31':
          department = 'COMPUTER SCIENCE & ENGINEERING';
          break;
        case '32':
          department = 'INFORMATION & COMMUNICATION TECHNOLOGY';
          break;
        case '34':
          department = 'MANUFACTURING ENGINEERING';
          break;
        case '35':
          department = 'ENVIRONMENTAL SCIENCE & TECHNOLOGY';
          break;
        case '36':
          department = 'CHEMICAL TECHNOLOGY';
          break;
        case '37':
          department = 'ENVIRONMENTAL SCIENCE AND ENGINEERING';
          break;
        case '39':
          department = 'NANO TECHNOLOGY';
          break;
        case '40':
          department = 'CIVIL & INFRASTRUCTURE ENGINEERING';
          break;
        case '41':
          department = 'ROBOTICS AND AUTOMATION';
          break;
        case '42':
          department = 'COMPUTER SCIENCE & ENGINEERING (ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING)';
          break;
        case '43':
          department = 'ARTIFICIAL INTELLIGENCE AND DATA SCIENCE';
          break;
        case '44':
          department = 'CHEMICAL ENGINEERING (GREEN TECHNOLOGY & SUSTAINABILITY ENGINEERING)';
          break;
        case '45':
          department = 'COMPUTER SCIENCE & ENGINEERING (INTERNET OF THINGS AND CYBER SECURITY INCLUDING BLOCK CHAIN TECHNOLOGY)';
          break;
        case '46':
          department = 'COMPUTER SCIENCE & ENGINEERING (DATA SCIENCE)';
          break;
        case '47':
          department = 'ELECTRONICS & INSTRUMENTATION ENGINEERING';
          break;
        case '48':
          department = 'COMPUTER SCIENCE & ENGINEERING (CYBER SECURITY)';
          break;
        case '49':
          department = 'COMPUTER SCIENCE & DESIGN';
          break;
        case '50':
          department = 'SMART & SUSTAINABLE ENERGY';
          break;
        case '51':
          department = 'FOOD ENGINEERING & TECHNOLOGY';
          break;
        case '52':
          department = 'ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING';
          break;
        case '53':
          department = 'PLASTICS ENGINEERING';
          break;
        case '54':
          department = 'ELECTRONICS AND COMMUNICATION (COMMUNICATION SYSTEM ENGINEERING)';
          break;
        case '89':
          department = 'MECHANICAL ENGINEERING';
          break;
        default:
          department = 'Unknown';
          break;
      }

      switch (clgCode) {
        case '001':
          college = 'A. D. PATEL INSTITUTE OF TECHNOLOGY, KARAMSAD';
          break;
        case '002':
          college = 'AHMEDABAD INSTITUTE OF TECHNOLOGY, GOTA, AHMEDABAD';
          break;
        case '003':
          college = 'ATMIYA INSTITUTE OF TECHNOLOGY & SCIENCE, RAJKOT';
          break;
        case '004':
          college = 'B. H. GARDI COLLEGE OF ENGINEERING & TECHNOLOGY, RAJKOT';
          break;
        case '005':
          college = 'BABARIA INSTITUTE OF TECHNOLOGY, VARNAMA';
          break;
        case '006':
          college = 'BHAGWAN MAHAVIR COLLEGE OF ENGINEERING & TECHNOLOGY, SURAT';
          break;
        case '007':
          college = 'BIRLA VISHVAKARMA MAHAVIDYALAYA, VALLABH VIDYANAGAR';
          break;
        case '008':
          college = 'BIRLA VISHVAKARMA MAHAVIDYALAYA, VALLABH VIDYANAGAR';
          break;
        case '009':
          college = 'C.K.PITHAWALA COLLEGE OF ENGG & TECHNOLOGY, SURAT';
          break;
        case '010':
          college = 'CHAROTAR INSTITUTE OF TECHNOLOGY, CHANGA';
          break;
        case '011':
          college = 'G. H. PATEL COLLEGE OF ENGINEERING & TECHNOLOGY, V V NAGAR';
          break;
        case '012':
          college = 'GANDHINAGAR INSTITUTE OF TECHNOLOGY, GANDHINAGAR';
          break;
        case '013':
          college = 'GOVERNMENT ENGINEERING COLLEGE, SECTOR - 28, GANDHINAGAR';
          break;
        case '014':
          college = 'GOVERNMENT ENGINEERING COLLEGE, BHARUCH';
          break;
        case '015':
          college = 'GOVERNMENT ENGINEERING COLLEGE, BHUJ';
          break;
        case '016':
          college = 'GOVERNMENT ENGINEERING COLLEGE, MODASA';
          break;
        case '017':
          college = 'VISHWAKARMA GOVERNMENT ENGINEERING COLLEGE, CHANDKHEDA';
          break;
        case '018':
          college = 'GOVERNMENT ENGINEERING COLLEGE, DAHOD';
          break;
        case '019':
          college = 'GOVERNMENT ENGINEERING COLLEGE, VALSAD';
          break;
        case '020':
          college = 'GOVERNMENT ENGINEERING COLLEGE, RAJKOT';
          break;
        case '021':
          college = 'GOVERNMENT ENGINEERING COLLEGE, BHAVNAGAR';
          break;
        case '022':
          college = 'GOVERNMENT ENGINEERING COLLEGE,AT. KATPUR, PATAN';
          break;
        case '023':
          college = 'DR.S.& S.S.GHANDHY GOVERNMENT ENGINEERING COLLEGE';
          break;
        case '024':
          college = 'HASMUKH GOSWAMI COLLEGE OF ENGINEERING, VAHELAL';
          break;
        case '025':
          college = 'INDUS INSTITUTE OF TECHNOLOGY & ENGINEERING, AHMEDABAD';
          break;
        case '026':
          college = 'KALOL INSTITUTE OF TECHNOLOGY & RESEARCH CENTRE, KALOL';
          break;
        case '027':
          college = 'KANKESHWARIDEVI INSTITUTE OF TECHNOLOGY, JAMNAGAR';
          break;
        case '028':
          college = 'L. D. COLLEGE OF ENGINEERING, AHMEDABAD';
          break;
        case '029':
          college = 'LALJIBHAI CHATURBHAI INSTITUTE OF TECHNOLOGY, BHANDU';
          break;
        case '030':
          college = 'LEELABEN DASHRATHBHAI RAMDAS PATEL INSTITUTE OF TECHNOLOGY & RESEARCH, GANDHINAGAR';
          break;
        case '031':
          college = 'LUKHDHIRJI ENGINEERING COLLEGE, MORBI';
          break;
        case '032':
          college = 'L. J. INSTITUTE OF ENGINEERING AND TECHNOLOGY, AHMEDABAD';
          break;
        case '033':
          college = 'MAHATMA GANDHI INSTITUTE OF TECHNICAL EDUCATION & RESEARCH CENTRE, NAVSARI';
          break;
        case '034':
          college = 'NARNARAYAN SHASTRI INSTITUTE OF TECHNOLOGY, JETALPUR';
          break;
        case '035':
          college = 'NOBLE GROUP OF INSTITUTIONS, JUNAGADH';
          break;
        case '036':
          college = 'SANJAYBHAI RAJGURU COLLEGE OF ENGINEERING';
          break;
        case '037':
          college = 'PARUL INSTITUTE OF ENGINEERING & TECHNOLOGY, WAGHODIA';
          break;
        case '038':
          college = 'R. K. COLLEGE OF ENGINEERING AND TECHNOLOGY, RAJKOT';
          break;
        case '039':
          college = 'S. P. B. PATEL ENGINEERING COLLEGE, MEHSANA';
          break;
        case '040':
          college = 'SANKALCHAND PATEL COLLEGE OF ENGINEERING, VISNAGAR';
          break;
        case '041':
          college = 'SARDAR VALLABHBHAI PATEL INSTITUTE OF TECHNOLOGY, VASAD';
          break;
        case '042':
          college = 'SARVAJANIK COLLEGE OF ENGINEERING & TECHNOLOGY, SURAT';
          break;
        case '043':
          college = 'SHANTILAL SHAH ENGINEERING COLLEGE, BHAVNAGAR';
          break;
        case '044':
          college = 'C. U. SHAH COLLEGE OF ENGINEERING & TECHNOLOGY, WADHWAN';
          break;
        case '045':
          college = 'SHRI S\'AD VIDYA MANDAL INSTITUTE OF TECHNOLOGY,BHARUCH';
          break;
        case '046':
          college = 'UNIVERSAL COLLEGE OF ENGINEERING & TECHNOLOGY, AHMEDABAD';
          break;
        case '047':
          college = 'VYAVASAYI VIDYA PRATISHTHAN\'S SANCH. COLLEGE OF ENGINEERING, RAJKOT';
          break;
        case '048':
          college = 'VALIA INSTITUTE OF TECHNOLOGY,VALIA, BHARUCH';
          break;
        case '049':
          college = 'SHRI SITARAMBHAI NARANJI PATEL INSTITUTE OF TECHNOLOGY,MANAGED BY VIDYABHARTI TRUST,UMRAKH -BARDOLI';
          break;
        case '050':
          college = 'SIGMA INSTITUTE OF ENGINEERING, VADODARA';
          break;
        default:
          college = 'Unknown';
          break;
      }

  
    return { passoutYear, college, department };
  };

  // module.exports = fetchDetails;