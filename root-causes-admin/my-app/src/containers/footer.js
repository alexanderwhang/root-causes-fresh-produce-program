import React from 'react'
import Footer from '../components/footer'
import Icon from '../components/icons'

export function FooterContainer() {
    return(
        <Footer>
            <Footer.Wrapper>
                <Footer.Row>
                    <Footer.Column>
                        <Footer.Title>RC Admin</Footer.Title>
                        <Footer.Link href="/">Home</Footer.Link>
                        <Footer.Link href="/participants">Participants</Footer.Link>
                        <Footer.Link href="/vol_info">Volunteer Info</Footer.Link>
                        <Footer.Link href="/callers">Callers</Footer.Link>
                        <Footer.Link href="/drivers">Drivers</Footer.Link>
                    </Footer.Column>

                    <Footer.Column>
                        <Footer.Title>Social</Footer.Title>
                        <Footer.Link href="https://www.facebook.com/groups/rootcauses/" target="_blank"><Icon className="fab fa-facebook-f"/>Facebook</Footer.Link>
                        <Footer.Link href="https://twitter.com/HealRootCauses" target="_blank"><Icon className="fa-brands fa-twitter"/>Twitter</Footer.Link>
                        <Footer.Link href="https://www.instagram.com/dukemed_root_causes/" target="_blank"><Icon className="fab fa-instagram"/>Instagram</Footer.Link>
                    </Footer.Column>

                    <Footer.Column>
                        <Footer.Title>&copy; 2022 Code+ </Footer.Title>
                        <Footer.Link href="mailto: rootcausescontact@duke.edu">rootcausescontact@duke.edu</Footer.Link>
                        <Footer.Link href="mailto: codeplus@duke.edu">codeplus@duke.edu</Footer.Link>
                    </Footer.Column>

                </Footer.Row>
            </Footer.Wrapper>
        </Footer>
    )
}