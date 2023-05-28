import { DateTime } from "luxon";

const API_KEY = 'e7704bc895b4a8d2dfd4a29d404285b6';
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) =>{
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({...searchParams, appid:API_KEY});

    return fetch(url)
        .then((res) => res.json())
};

const formatCurrentWeather = (data) =>{
    const {
        coord: {lon, lat},
        main: {temp, temp_min, temp_max, feels_like, humidity},
        wind: {speed},
        dt,
        sys: {country, sunrise, sunset},
        name,
        weather
    } = data

    const {main : details, icon} = weather[0];

    return{lon, lat, temp, temp_min, temp_max, feels_like, humidity, speed, country, sunrise, sunset, dt, name, details, icon}
};

const formatForecastWeather = (data) => {
    let {timezone, daily, hourly} = data;
    daily = daily.slice(1,8).map(d => {
        return{
            title: formatToLocalTime(d.dt, timezone, 'ccc'),
            temp: d.temp.day,
            icon: d.weather[0].icon
        }
    });
    hourly = hourly.slice(1,13).map(d => {
        return{
            title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.temp,
            icon: d.weather[0].icon
        }
    });

    return {timezone, daily, hourly};
};

const getFormattedWeatherData = async (searchParams) =>{
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather);
    const {lon, lat} = formattedCurrentWeather;
    const formattedForecastWeather = await getWeatherData("onecall", {
        lat,
        lon,
        exclude : "current, minutely, alerts",
        units: searchParams.units,
    }).then(formatForecastWeather)
    return {...formattedCurrentWeather, ...formattedForecastWeather};
};

const formatToLocalTime = (secs, zone, format="cccc, dd LLL yyyy' | Local Time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`

export default getFormattedWeatherData

export {formatToLocalTime, iconUrlFromCode}