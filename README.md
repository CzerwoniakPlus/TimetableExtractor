[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![BSD-3-Clause license][license-shield]][license-url]
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/CzerwoniakPlus/TimetableExtractor/Build%20Node.js%20(yarn)?style=for-the-badge)

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/CzerwoniakPlus/CzerwoniakPlus">
    <img src="https://lydia.czerwoniakplus.pl/assets/CzerwoniakPlus/CzerwoniakPlus-circle.png"  alt="Logo" width="80" height="80">
  </a>

<h3 align="center">TimetableExtractor</h3>

  <p align="center">
    📅 A simple tool for sorting the PDFs into classes and storing in base64, using Azure OCR
    <br />
    <br />
    <a href="https://github.com/CzerwoniakPlus/TimetableExtractor/issues">Report a bug</a>
    ·
    <a href="https://github.com/CzerwoniakPlus/TimetableExtractor/issues">Request a feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About the project</a>
      <ul>
        <li><a href="#built-with">Built with</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

TimetableExtractor is a really simple tool for automatical obtaining, sorting the timetable PDFs by classes using Azure OCR, storing them in base64 and sending to CzerwoniakPlus API.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built with

- [![Node][node.js]][node-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Make sure to use Node.js version of at least v16.15.0 and install newest versions of:

- npm

  ```sh
  npm install npm@latest -g
  ```

- yarn

  ```sh
  npm install yarn@latest -g
  ```

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/CzerwoniakPlus/TimetableExtractor.git
   ```

2. Install required packages

   ```sh
   yarn install
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Automatic timetable URL extraction
- [x] Dividing PDFs into separate buffers
- [x] Reading class name using Azure OCR
- [x] Sorting by class name
- [x] Sending obtained data to API

See the [open issues](https://github.com/CzerwoniakPlus/TimetableExtractor/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the BSD-3-Clause license. See `LICENSE.md` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Mateusz Tatko - [@mtatko](https://linkedin.com/in/mtatko) - mtatko@mtatko.dev

Project Link: [https://github.com/CzerwoniakPlus/CzerwoniakPlus](https://github.com/CzerwoniakPlus/TimetableExtractor)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/CzerwoniakPlus/TimetableExtractor.svg?style=for-the-badge
[contributors-url]: https://github.com/CzerwoniakPlus/TimetableExtractor/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/CzerwoniakPlus/TimetableExtractor.svg?style=for-the-badge
[forks-url]: https://github.com/CzerwoniakPlus/TimetableExtractor/network/members
[stars-shield]: https://img.shields.io/github/stars/CzerwoniakPlus/TimetableExtractor.svg?style=for-the-badge
[stars-url]: https://github.com/CzerwoniakPlus/TimetableExtractor/stargazers
[issues-shield]: https://img.shields.io/github/issues/CzerwoniakPlus/TimetableExtractor.svg?style=for-the-badge
[issues-url]: https://github.com/CzerwoniakPlus/TimetableExtractor/issues
[license-shield]: https://img.shields.io/github/license/CzerwoniakPlus/TimetableExtractor.svg?style=for-the-badge
[license-url]: https://github.com/CzerwoniakPlus/TimetableExtractor/blob/master/LICENSE.md

<!---->

[node.js]: https://img.shields.io/badge/-Node.js-333333?style=for-the-badge&logo=node.js
[node-url]: https://nodejs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[react-native]: https://img.shields.io/badge/-React%20Native-%2320232a?style=for-the-badge&logo=react
[react-native-url]: https://reactnative.dev/
[webpack]: https://img.shields.io/badge/Webpack-2ea44f?style=for-the-badge&logo=webpack&logoColor=ffffff
[webpack-url]: https://webpack.js.org/
