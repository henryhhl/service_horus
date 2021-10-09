
import React from 'react';

const Footer = ( props ) => {
    const { } = props;

    return (
        <>
            <div className="app-wrapper-footer" style={{ position: 'relative', top: -4, }}>
                <div className="app-footer">
                    <div className="app-footer__inner">
                        <div className="app-footer-right">
                            <ul className="header-megamenu nav">
                                <li className="nav-item">
                                    <a data-placement="top" rel="popover-focus" data-offset="300" data-toggle="popover-custom" className="nav-link">
                                        Footer Menu
                                        <i className="fa fa-angle-up ml-2 opacity-8"></i>
                                    </a>
                                    <div className="rm-max-width rm-pointers">
                                        <div className="d-none popover-custom-content">
                                            <div className="dropdown-mega-menu dropdown-mega-menu-sm"></div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo( Footer );
