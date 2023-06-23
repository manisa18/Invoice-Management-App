# Problem Statement for Web Application Development:
**Project based on ReactJS,MUI, JAVA, MySQL.**

The objective of the Web Application Development internship project is:
To build a **Full-stack Invoice Management Application** using React Js, JDBC, Java Servlets.
* Build a **responsive Receivables Dashboard.**
* **Visualize Data** in the form of grids.
* Perform **Searching** operations on the invoices.
* **Add and Edit Data** in the editable fields of the grid.
* **Delete Data** of selected rows in predefined templates.
* **Predict button** - Clicking on the “Predict” button will populate the Order Amount column. 

## Receivables Dashboard Page
It consists of 3 sections:
### 1. Header:
First Section is the header which comprises the **ABC Product logo on the left, the Highradius Logo in the middle and Invoice List in the bottom left.**
### 2. Body
The second section consists of **Homepage, Add data, Analytics view, Search and Advance Search.**
### 3. Footer
The third section consists of **privacy policy**

## Body : Homepage
### Section 1:
#### Grid:
Grid with below 10 columns from the database along with Checkbox
Sl No, Customer Order Id, Sales Org, Distribution Channel, Company Code, Order Creation Date, Order Currency, Customer Number, Amount in USD, Order Amount

### Section 2:
All the buttons should present in this section
  1. Refresh Data Button
    * On clicking should refresh the Grid Data
  2. Edit Button
    * It should be disabled by default
    * Enable edit button on selecting checkbox and should be disabled on selecting multiple check
    * On clicking edit button, a pop up window will appear with pre populated data of the selected row

  3. Delete Button
    * Delete button should also be disabled by default 
    * Enable the delete button on selection single or multiple checkbox
    * Delete button  should be able to delete single or multiple row
    * On clicking delete button there should be a popup window for delete confirmation

  4. Predict Button
     * The Predict button should be enabled on selecting the checkbox (1 row).
     * On clicking the button it should populate the predicted amount in the Order Amount column.
     * Here we have 0 by default in the order amount for Sl no- 2 . On click it will predict the order amount.
       
  5. Pagination
     * User should be able to section number of rows for page

## Body : Add Data
Add section should contain following text fields and Date Fields
Customer Order ID, Sales Org, Distribution Channel, Customer Number, Company Code, Order Currency, Amount in USD, Order Creation Date - Date Field

## Body : Analytics View
Analytics view contains two text fields named as Distribution Channel and Customer Number
- Bar graph 
- Pie Chart

## Body : Search
* User should be able to search with help of Customer Order ID and on hitting enter a new search result section will appear after the Add data section with the output.
* There should be a Clear button appear in place of the Advance Search button  beside the search text field on clicking on the clear button search results section and the clear button should hide and move back to Home Page.

## Body : Advance Search
* On clicking Advance Search button there should be a pop window showing the text fields for the search
* By default there should be 3 text fields Customer Order Id. Customer Number, Sales Org.
* On hitting enter after every input advance search should show the inputs given as below. It should be able to take multiple inputs for the same field.
* Output should be in the search result section 




