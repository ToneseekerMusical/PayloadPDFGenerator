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
* Add individual document flow direction for main body, headers, and footers.
* Add text wrap settings around images. May need a 2D array as a document representation to handle wrapping.
* Change Header and Footer globals from Array to Blocks, create Layout block, rename layout field to sections, change section widths and heights to allow for relative dimensions and static dimensions, add layout dimensions with relative and static dimension options as well.
* Move page numbers from footer to PDF Templates collection with positioning settings to allow for more placement options.
* Define Header and Footer insertion functions, and add them to the pdfGenerator function.
* Set Header and Footer to have their own cursors, and mark minimum and maximum x and y values for the body element cursor, and automatically add page when cursor reaches the maximum value. May have issues with creating page too soon, will need switch case to handle various scenarios.

* Write the initial PDF generation functions:
  * Base elements:
    * form element
    * html element
    * table element
    * pattern elements
    * path elements
    * form component elements
  * Template Elements:
    * Headers
    * Footers
    * Sections

* Extend Element Generation functions:
  * image element
    
* Copy final plugin types from payload.types.ts to types.d.ts