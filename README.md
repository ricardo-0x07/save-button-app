# save-button-app

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 4.0.5. and written using typescript.
1. This save button application was developed to function just as a native mobile application would.
2. App is equally functional on mobile and desktop, using responsive design to ensure its displayed in a useable state.
3. All form inputs have appropriate types, labels, placeholders, and immediately validated.
4. Application defaults to offline-first functionality, functioning if a network connection does not exist.
5. All images have alternative text, focus is appropriately managed, elements are semantically used appropriately. When semantic elements are not used, ARIA roles are properly applied. Colors and contrast are managed.
6. If components are self-contained units of functionality and declaratively configurable.
7. The application is installable to user’s home screen.
8. Application uses native push notifications to notify the user of new opportunities posted and access the user’s camera to allow the user to capture images of new opportunities.
9. App includes a build process (such as Grunt or Gulp). Assets are minimized and concatenated as appropriate.




## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 4.x.x, npm >= 2.x.x
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [SQLite](https://www.sqlite.org/quickstart.html)

### Developing

1. Run `npm install` to install server dependencies.

2. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `gulp build` for building and `gulp serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.

# Installation

1. Fork the repository, download it and run both 'npm install' and 'bower install' form the application root.
2. The run the "gulp serve" command from the root directory (the src folder) in the command line as described below on running the build process step 1.
3. You may use "gulp serve:dist" to serve distribution files.

## Usage
1. After the application has been loaded successfully, use 'New Oppotunity' link or the 'Opportunity' button in the footer to create a new Opportunity.
2. On the New Opportunity page note the details of the Opportunity inthe text area and either upload or take a photo of the Opportunity and Submit.
3. Use the subscibe button to subscibe to Opportunity notifications to be notified when someone logs another Opportunity.


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

1.

## Credits

1. The udacity nano degree team provided the guidance and training i required to complete the initial version of this project.


## License
MIT License

Copyright (c) 2016 Clive Cadogan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


## changelog
1. 


# Running the Build Process

1. Once the build process has been set up as described above navigate to the root directory of the project and type "gulp serve" and press enter to run the default task this will open the application in the browser.
2. While the application is running via the build process several gulp tasks will be watching for changes and errors in the css, js, html and spec files and update the distribution files automatically. The browser will be refreshed for changes to the index.html.

#Versioning
 Version 1. 