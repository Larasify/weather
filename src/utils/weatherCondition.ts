export const weatherCondition = (weathercode: number) => {
  if (weathercode == 0) {
    return {
      condition: "Clear sky",
      iconurl: "https://cdn.weatherbit.io/static/img/icons/c01d.png",
    };
  }
  if (weathercode == 1) {
    return {
      condition: "Few clouds",
      iconurl: "https://cdn.weatherbit.io/static/img/icons/c02d.png",
    };
  }
  if (weathercode == 2) {
    return {
      condition: "Scattered clouds",
      iconurl: "https://cdn.weatherbit.io/static/img/icons/c03d.png",
    };
  }
  if (weathercode == 3) {
    return {
      condition: "Broken clouds",
      iconurl: "https://cdn.weatherbit.io/static/img/icons/c04d.png",
    };
  }
  if (weathercode == 45 || weathercode == 48) {
    return {
      condition: "Fog",
      iconurl: "https://cdn.weatherbit.io/static/img/icons/a05d.png",
    };
  }
  if (
    weathercode == 51 ||
    weathercode == 53 ||
    weathercode == 55 ||
    weathercode == 56 ||
    weathercode == 57 ||
    weathercode == 59
  ) {
    return {
      condition: "Freezing drizzle",
      iconurl: "https://cdn.weatherbit.io/static/img/icons/r06d.png",
    };
  }
  if (
    weathercode == 61 ||
    weathercode == 63 ||
    weathercode == 65 ||
    weathercode == 66 ||
    weathercode == 67
  ) {
    return {
      condition: "Rain",
      iconurl: "https://cdn.weatherbit.io/static/img/icons/r01d.png",
    };
  }
  if (
    weathercode == 71 ||
    weathercode == 73 ||
    weathercode == 75 ||
    weathercode == 76 ||
    weathercode == 77 ||
    weathercode == 79
  ) {
    return {
      condition: "Snow",
      iconurl: "https://cdn.weatherbit.io/static/img/icons/s01d.png",
    };
  }
  if (
    weathercode == 80 ||
    weathercode == 81 ||
    weathercode == 82
  ) {
    return {
      condition: "Rain Showers",
      iconurl: "https://cdn.weatherbit.io/static/img/icons/r06d.png",
    };
  }
  if (
    weathercode == 85 ||
    weathercode == 86
  ) {
    return {
      condition: "Snow Showers",
      iconurl: "https://cdn.weatherbit.io/static/img/icons/s03d.png",
    };
  }
  if (
    weathercode == 95 ||
    weathercode == 96 ||
    weathercode == 99
  ) {
    return {
      condition: "Thunderstorm",
      iconurl: "https://cdn.weatherbit.io/static/img/icons/t01d.png",
    };
  }

  //SWITCH OF SHAME INTERFACES ARE HARD
  /*
  switch (weathercode) {
    case 0:
      return {
        condition: "Clear sky",
        iconurl: "https://cdn.weatherbit.io/static/img/icons/c01d.png",
      };
    case 1:
      return {
        condition: "Few clouds",
        iconurl: "https://cdn.weatherbit.io/static/img/icons/c02d.png",
      };
    case 2:
      return {
        condition: "Scattered clouds",
        iconurl: "https://cdn.weatherbit.io/static/img/icons/c03d.png",
      };
    case 3:
      return {
        condition: "Broken clouds",
        iconurl: "https://cdn.weatherbit.io/static/img/icons/c04d.png",
      };
    case 45:
    case 48:
      return {
        condition: "Fog",
        iconurl: "https://cdn.weatherbit.io/static/img/icons/a05d.png",
      };
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
    case 59:
      return {
        condition: "Freezing drizzle",
        iconurl: "https://cdn.weatherbit.io/static/img/icons/r06d.png",
      };
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
      return {
        condition: "Rain",
        iconurl: "https://cdn.weatherbit.io/static/img/icons/r01d.png",
      };
    case 71:
    case 73:
    case 75:
    case 76:
    case 77:
    case 79:
      return {
        condition: "Snow",
        iconurl: "https://cdn.weatherbit.io/static/img/icons/s01d.png",
      };
    case 80:
    case 81:
    case 82:
      return {
        condition: "Rain Showers",
        iconurl: "https://cdn.weatherbit.io/static/img/icons/r06d.png",
      };
    case 85:
    case 86:
      return {
        condition: "Snow Showers",
        iconurl: "https://cdn.weatherbit.io/static/img/icons/s03d.png",
      };
    case 95:
    case 96:
    case 99:
      return {
        condition: "Thunderstorm",
        iconurl: "https://cdn.weatherbit.io/static/img/icons/t01d.png",
      };
  }*/

};
