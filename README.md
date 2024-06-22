# Payload PDF Generator Plugin

This plugin is currently under development. 

The goal is to allow the easy creation of PDF templates that can be populated by document data on the fly and downloaded to the user's local machine.

Feel free to contribute if this project interests you.

## Current issues:

* Current method of setting default columns in enabled collections from plugin to add the Generate PDF cell component to the collection list currently does not work.
* Changing the PDF Template's assigned collection does nothing without refreshing the page.
* Font Loader function failes 90% of the time, but will occasionally work. Need to investigate, low priority at the moment.

### To-do:

* Add toast errors to generatePDF function
* Refactor PDFTemplate collection, blocks, and globals, and add stricter typing to eliminate as many null and undefined properties as possible.

* Write the PDF generation functions:
  * Base elements:
    * form element
    * html element
    * image element
    * table element
    * text element
    * pattern elements
    * path elements
    * form component elements
  * Template Elements:
    * Headers
    * Footers
    * Watermarks
    * Sections
    
* Copy final plugin types from payload.types.ts to types.d.ts