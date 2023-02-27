class HomePage{

    getRadioButton(){
        return cy.get('input[value="radio1"]')
    }

    getDropdown(){
        return cy.get('select#dropdown-class-example')
    }

    getCheckbox(){
        return cy.get('input#checkBoxOption2')
    }

    getOpenTabBtn(){
        return cy.get('a#opentab')
    }

    getAlertBtn(){
        return cy.get('input#alertbtn')
    }

    getConfirmBtn(){
        return cy.get('input#confirmbtn')
    }

    getMouseOverBtn(){
        return cy.get('button#mousehover')
    }

}

export default HomePage