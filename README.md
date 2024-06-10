# Payload PDF Generator Plugin

This plugin is currently under development. 

The goal is to allow the easy creation of PDF templates that can be populated by document data on the fly and downloaded to the user's local machine.

## Current issues:

* Group and Array Field mapping functions do not allow for nested groups or arrays in collection configuration
* Current method of setting default columns in enabled collections from plugin currently does not work.

### To-do:

* Finish pdfTemplate collection config.
* Define built in globals.
* Write a script to convert TTF font files to base64, and store that data in the pdfFonts global for easy font selection.
* Write a script to convert selected images to base64 for embedding in pdf file.
* Write the PDF generation script.