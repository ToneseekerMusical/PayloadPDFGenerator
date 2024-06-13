# Payload PDF Generator Plugin

This plugin is currently under development. 

The goal is to allow the easy creation of PDF templates that can be populated by document data on the fly and downloaded to the user's local machine.

## Current issues:

* Current method of setting default columns in enabled collections from plugin to add the Generate PDF cell component to the collection list currently does not work.
* Changing the PDF Template's assigned collection does nothing without refreshing the page.

### To-do:

* Write a function to convert selected images and fonts to base64 for embedding in pdf file.
* Write the PDF generation function