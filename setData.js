const axios = require('axios');
const xlsx = require('xlsx');

// Base URL of your backend
const BASE_URL = 'http://127.0.0.1:8000/api/';

// Function to read the Excel file and parse the data
function readExcelFile(filePath) {
    const workbook = xlsx.readFile(filePath);
    const sheets = workbook.Sheets;
    const jsonData = [];

    for (const sheetName in sheets) {
        if (sheets.hasOwnProperty(sheetName)) {
            const sheet = sheets[sheetName];
            const sheetData = xlsx.utils.sheet_to_json(sheet);
            jsonData.push(...sheetData);
        }
    }
    return jsonData;
}

// Dictionary mapping video numbers to video names
const video_dict = {
    1: '1 - conventional leg press.m4v',
    2: '2 - wide leg press.m4v',
    3: '3 - close leg press.m4v',
    4: '4 - hack squat.m4v',
    5: '5 - leg extension.m4v',
    6: '6 - seated hamstring curl.m4v',
    7: '7 - hip adduction.m4v',
    8: '8 - abduction.m4v',
    9: '9 - lying hamstring curl.m4v',
    10: '10 - single leg lying hamstring curl.m4v',
    11: '11 - tbar sumo squats.m4v',
    12: '12 - heel elevated goblet squat.m4v',
    13: '13 - heel elevated squat bodyweight.m4v',
    14: '14 - suitcase squats.m4v',
    15: '15 - db sumo squat with pulse.m4v',
    16: '16 - squat jump.m4v',
    17: '17 - db lunges.m4v',
    18: '18 - front foot elevated reverse lunge.m4v',
    19: '19 - db curtsy lunge.m4v',
    20: '20 - db romanian deadlift.m4v',
    21: '21 - lateral raises.m4v',
    22: '22 - single arm lateral raises.m4v',
    23: '23 - front raises.m4v',
    24: '24 - alternating bicep curls.m4v',
    25: '25 - dual bicep curl.m4v',
    26: '26 - db tricep extension.m4v',
    27: '27 - alternating front raises.m4v',
    28: '28 - db lunge walk.m4v',
    29: '29 - high step up with pulse.m4v',
    30: '30 - bulgarians with pulse.m4v',
    31: '31 - b stance single leg romanian.m4v',
    32: '32 - hammer curl into press.m4v',
    33: '33 - band squats.m4v',
    34: '34 - band side to side steps.m4v',
    35: '35 - band curtsey lunge.m4v',
    36: '36 - band squat jumps.m4v',
    37: '37 - pop squats.m4v',
    38: '38 - band kickbacks.m4v',
    39: '39 - band fire hydrants.m4v',
    40: '40 - band clamshells.m4v',
    41: '41 - band leg raises.m4v',
    42: '42 - band hip thrust.m4v',
    43: '43 - band parallel squat to sumo squat.m4v',
    44: '44 - good morning with squat.m4v',
    45: '45 - db good morning with squat.m4v',
    46: '46 - walking squats.m4v',
    47: '47 - banded standing hip abduction.m4v',
    48: '48 - banded walk.m4v',
    49: '49 - banded walking lunges.m4v',
    50: '50 - banded wall sit hip abduction.m4v',
    51: '51 - name.m4v',
    52: '52 - band crossover donkey kicks.m4v',
    53: '53 - side lunges.m4v',
    54: '54 - wall sit.m4v',
    55: '55 - forward and reverse lunge into squat.m4v',
    56: '56 - body weight walking lunges.m4v',
    57: '57 - curtsy squat into lunges.m4v',
    58: '58 - bench dips.m4v',
    59: '59 - frogger.m4v',
    60: '60 - seated abduction with band.m4v',
    61: '61 - front foot elevated bulgarians.m4v',
    62: '62 - single arm bent over row.m4v',
    63: '63 - kb b-stance rdl.m4v',
    64: '64 - kb rdl.m4v',
    65: '65 - kb single leg rdl into curtsy lunge.m4v',
    66: '66 - back squat.m4v',
    67: '67 - sumo squat with pulse.m4v',
    68: '68 - angled squat.m4v',
    69: '69 - bb front foot elevated reverse lunge.m4v',
    70: '70 - bb squat Bulgarian.m4v',
    71: '71 - lunge pulses.m4v',
    72: '72 - bb hip thrust.m4v',
    73: '73 - bb hip thrust banded.m4v',
    74: '74 - kb single leg glute bridge.m4v',
    75: '75 - kb banded romanians.m4v',
    76: '76 - band aparts.m4v',
    77: '77 - seated military press.m4v',
    78: '78 - arnold press into uppercut press.m4v',
    79: '79 - combo alternating lateral raise.m4v',
    80: '80 - bb military press.m4v',
    81: '81 - bb upright row.m4v',
    82: '82 - bb bicep curl.m4v',
    83: '83 - bb row.m4v',
    84: '84 - sissy squat.m4v',
    85: '85 - bb sumo deadlift.m4v',
    86: '86 - bb conventional deadlift.m4v',
    87: '87 - glute hyperextension.m4v',
    88: '88 - stand leg raises.m4v',
    89: '89 - rear delt fly machine.m4v',
    90: '90 - assisted pull up.m4v',
    91: '91 - lat pull down.m4v',
    92: '92 - tricep rope push down.m4v',
    93: '93 - cable face pulls.m4v',
    94: '94 - cable bicep curls.m4v',
    95: '95 - cable kick backs.m4v',
    96: '96 - cable donkey kicks.m4v',
    97: '97 - cable crossover kick.m4v',
    98: '98 - cable abduction.m4v',
    99: '99 - cable adduction.m4v',
    100: '100 - cable pullthroughs.m4v',
}

// Function to map video number to video name without extension
function mapVideoLink(video_number) {
    const videoName = video_dict[video_number];
    if (videoName) {
        return videoName.replace('.m4v', '');
    }
    return 'no video';
}

// Function to create exercises
async function createExercise(exercise) {
    try {
        let data = {
            exercise_number: exercise.exerciseNumber,
            title: exercise.title,
            type: exercise.type,
            sets: exercise.sets,
            reps: exercise.reps,
            duration: exercise.duration,
            description: exercise.description,
            video_url: mapVideoLink(exercise.videoLink),
            video_url2: exercise.videoNumber,
            week: exercise.week,
            day: exercise.dayId
        };
        console.log(data);
        const response = await axios.post(`${BASE_URL}exercise/create/`, data);
        console.log(`Created Exercise ${exercise.exerciseNumber} for Week ${exercise.week}, Day ${exercise.dayId}:`, response.data);
    } catch (error) {
        console.error(`Error creating exercise ${exercise.exerciseNumber} for Week ${exercise.week}, Day ${exercise.dayId}:`, error.response ? error.response.data : error.message);
    }
}

// Main function to create all exercises
async function createAllExercises(filePath) {
    const exercises = readExcelFile(filePath);
    const errorOnes = [];
    for (const exercise of exercises) {
        let data = {
            exercise_number: exercise['Exercise Number'],
            title: exercise.Title,
            type: exercise.Type,
            sets: parseInt(exercise.Sets),
            reps: parseInt(exercise.Reps),
            duration: parseInt(exercise.Duration)*60,
            description: exercise.Description,
            video_url: mapVideoLink(exercise['Video Link']),
            week: exercise.Week,
            day: exercise.DayId
        };
        try {
            const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIyMTE2OTkzLCJqdGkiOiIzMmM3MGQ5YTI5NmI0YjY5YTEzYTJhZWNlNjVlZWU3OCIsInVzZXJfaWQiOjF9.mqTryK4iNxvKuujYj89tGkSurvrHWwgtBJtWBvC4P-o`
            const response = await axios.post(`${BASE_URL}exercise/exercises/create/`, data , {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(`Created Exercise ${exercise['Exercise Number']} for Week ${exercise.Week}, Day ${exercise.DayId}:`, response.data);
        }
        catch (error) {
            console.error(`Error creating exercise ${exercise['Exercise Number']} for Week ${exercise.Week}, Day ${exercise.DayId}:`, error.response ? error.response.data : error.message);
            errorOnes.push(exercise);
        }
        console.log(data);
    }

    console.log('Errors:\n\n\n', errorOnes);
}

// Run the script
const filePath = 'updated_exercise_list.xlsx'; // Replace with the path to your Excel file
createAllExercises(filePath);
