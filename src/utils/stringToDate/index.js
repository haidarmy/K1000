export const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

export const stringToDate = (dateOfBirth, setDate) => {

    const split = dateOfBirth.split(' ');
    const day = split[0]
    const year = split[2]
    const month = months.indexOf(split[1]) + 1;
    if (day.length !== 2 && month.length !== 2) {
      const stringDate = `0${day}.0${month}.${year}`;
      const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
      const date = new Date(stringDate.replace(pattern, '$3-$2-$1'));
      setDate(date);
    } else if (day.length !== 2 && month.length === 2) {
      const stringDate = `0${day}.${month}.${year}`;
      const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
      const date = new Date(stringDate.replace(pattern, '$3-$2-$1'));
      setDate(date);
    } else if (day.length === 2 && month.length !== 2) {
      const stringDate = `${day}.0${month}.${year}`;
      const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
      const date = new Date(stringDate.replace(pattern, '$3-$2-$1'));
      setDate(date);
    } else {
      const stringDate = `${day}.${month}.${year}`;
      const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
      const date = new Date(stringDate.replace(pattern, '$3-$2-$1'));
      setDate(date);
    }
  };