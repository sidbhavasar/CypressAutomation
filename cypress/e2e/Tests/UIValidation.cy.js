/// <reference types="cypress"/>
/// <reference types="cypress-iframe"/>
import "cypress-iframe"
import HomePage from "../../support/PageObjects/HomePage";

//create object of HomePage class
const homePage = new HomePage()

describe('test suite', function(){

    beforeEach(function(){
        cy.fixture('TestData').then(function(data){
            this.TestData = data
        })

        //Launch Application before each test
        cy.LaunchApplication()

    })

    it('UIValidationTest', function(){

        //select 'radio1' radion button
        homePage.getRadioButton().click()

        //type country in country editbox and select country from suggestion box
        cy.SelectCountry(this.TestData.country)

        //select value from dropdown
        homePage.getDropdown().select(this.TestData.dropdownValue).should('have.value', this.TestData.dropdownValue)

        //Check option2 checkbox and verify it is checked
        homePage.getCheckbox().check().should('be.checked')


    })

    it('WindowAlertValidation', function() {

        //Click on Open Tab button (open in same tab as cypress doesnot provide multi tab support)
        homePage.getOpenTabBtn().invoke('removeAttr', 'target').click()
        cy.go('back')//navigate back to homepage

        //Accept and Verify alert and Confirm buttons
        homePage.getAlertBtn().click()
        homePage.getConfirmBtn().click()

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal(this.TestData.AlertMessage)
        })

        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal(this.TestData.confirmPopup)
        })

    })

    it('WebTableValidation', function() {

        //get Price for REST API course
        let price = 0
        cy.get('table#product tbody td:nth-child(2)').each(($ele, index, $list) => {
            if($ele.text().includes(this.TestData.CourseName)){
                price = $ele.next().text()
                cy.wrap(price).as('price')
            }
        })
        cy.get('@price').then(value=> {
            cy.log('Price for Course: ' + this.TestData.CourseName + ' is:' + value)
        })

        //Add all amounts of Fixed Header table and compare with Total Amount text beneath
        let countTotal = 0
        cy.get('div.tableFixHead table#product tbody td:nth-child(4)').each(($ele) => {
            countTotal = countTotal + Number($ele.text())
            cy.wrap(countTotal).as('countTotal')
        })
        cy.get('@countTotal').then(Countvalue => {
            //Fetch total value from UI Text
            cy.get('div.totalAmount').then($ele => {
                //let actualValue = $ele.text().split(':')[1]
                expect($ele.text().split(':')[1].trim()).to.equal(String(Countvalue))
            })
        })        
    })

    it('MouseOverValidation', function() {

        //print all the buttons available when MouseOver button is mouse overed
        homePage.getMouseOverBtn().invoke('show')
        cy.get('div.mouse-hover-content a').each(($ele, index, $list) => {
            cy.log($ele.text())
        })
        
    })

    it('FrameHandling', function(){

        //Load the frame object
        cy.frameLoaded('#courses-iframe')

        //Get number of courses present within frame
        let courseCount = 0
        cy.iframe().find('div.courses-block').each($ele => {
            courseCount = courseCount + 1
            cy.wrap(courseCount).as('courseCount')
        })
        cy.get('@courseCount').then(value => {
            cy.log('total count of courses within frame is: ' + value)
        })
    })
})


