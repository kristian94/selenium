# selenium

*Technologies used: Node, Mocha and selenium-webdriver*

## Test results (mocha)

![](https://github.com/kristian94/selenium/blob/master/results/test%20results.PNG)

#### Manual Vs. Automated Testing

Automated testing allows code to be refactored safely. Automated testing requires a level of meticulousness. This can be a pro, as it allows to describe complex behaviour, but can also be a con as the developer may end up spending more time writing tests than actual application code.

#### Test Pyramid

The Test Pyramid essentially suggests that you should have more low-level Unit tests than high level BroadStack tests. Unit tests are in most cases more resilient to changes and can often be a valuable asset when refactoring. BroadStack tests on the the other hand are more vulnerable to change as they will sometimes need to be entirely redone if the features of the application are changed. This exercise definitely highlighted some of the cool things you can do with GUI testing, but also how difficult and cumbersome it can be to write effective automated GUI tests.

#### GUI Test Vulnerability

GUI tests are vulnerable to change, depending on the level of test coverage, because GUI's are typically subject to more changes than business logic. GUI and the presentational layer depend on the underlying data model of the application. This means that everytime the data model is changed, the GUI must also be altered to be able to represent the updated model.

#### The DOM

HTML pages are built up of elements in a tree structure. The elements live in the DOM, the Document Object Model, and the visible page is rendered based on the DOM (the styling and script is also part of the DOM).

#### The Waiting Problem

Because of the way React updates components (by redrawing views when the state changes) it was sometimes needed to put the testing thread on hold while the browser script worked to update the DOM. I solved this by using a function from the selenium library i used (selenium-webdriver) that allowed me to issue small timeouts. This way I could make sure the DOM was updated and continue with the testing. 
