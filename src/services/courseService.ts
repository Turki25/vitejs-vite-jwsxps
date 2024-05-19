export interface Course {
  course: string;
  examDate: Date;
}

export const fetchCourses = async (): Promise<Course[]> => {
  try {
    const response = await fetch(
      'getdates4-2mswmci44q-uc.a.run.app/reservedDates',
      {
        mode: 'no-cors',
        headers: {
          Connection: 'keep-alive',
          'Accept-Encoding': 'gzip, deflate, br',
          Accept: 'application/json',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
          Host: 'getdates4-2mswmci44q-uc.a.run.app',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }

    const text = await response.text();
    console.log('Response text:', text); // Log the raw response text

    if (!text) {
      throw new Error('Empty response');
    }

    const data = JSON.parse(text);
    console.log('Raw data:', data); // Log the raw data

    const formattedData = data.map((item: any) => ({
      course: item.course,
      examDate: new Date(item.examDate),
    }));

    console.log('Formatted data:', formattedData); // Log the formatted data

    return formattedData;
  } catch (error) {
    console.error('Error in fetchCourses:', error);
    throw error;
  }
};
