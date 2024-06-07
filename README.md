# Payload PDF Generator Plugin

This plugin is currently under development. 

The goal is to allow the easy creation of PDF templates that can be populated by document data on the fly and downloaded to the user's local machine.

## Current issues:

* The field select components currently do not save their values to the base text field.
* A document must be present in the target collection to populate the field select option lists

### To-do:

* Define built in globals fields.
* Pass existing media collection to plugin to ensure the image component does not break Payload.
* Ensure the field select component can only populate local fields based on parent field type, I.E. children elements of a section can only select fields within the group field selected by the parent section.
* Write the PDF generation script.