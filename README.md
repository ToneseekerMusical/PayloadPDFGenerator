# Payload PDF Generator Plugin

This plugin is currently under development. 

The goal is to allow the easy creation of PDF templates that can be populated by document data on the fly and downloaded to the user's local machine.

## Current issues:

* pdfFont Global: field hooks in array child fields do not work correctly: Base64 field hook not updating value on save.
* Current method of setting default columns in enabled collections from plugin to add the Generate PDF cell component to the collection list currently does not work.
* Changing the PDF Template's assigned collection does nothing without reloading the editor.

### To-do:

* Create a font select component that pulls data from pdfFont global
* Finish pdfTemplate collection config.
* Define built in globals.
* pdfFont base64 field hook that uses toBase64 function to populate field.
* Write a script to convert selected images to base64 for embedding in pdf file.
* Write the PDF generation script.