'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">bff documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-bbc539ab4c2f891496e369ffb3c36132"' : 'data-target="#xs-controllers-links-module-AppModule-bbc539ab4c2f891496e369ffb3c36132"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-bbc539ab4c2f891496e369ffb3c36132"' :
                                            'id="xs-controllers-links-module-AppModule-bbc539ab4c2f891496e369ffb3c36132"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-bbc539ab4c2f891496e369ffb3c36132"' : 'data-target="#xs-injectables-links-module-AppModule-bbc539ab4c2f891496e369ffb3c36132"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-bbc539ab4c2f891496e369ffb3c36132"' :
                                        'id="xs-injectables-links-module-AppModule-bbc539ab4c2f891496e369ffb3c36132"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-0e3fecdd865c3cab79f42b19f5cc59a8-1"' : 'data-target="#xs-controllers-links-module-AppModule-0e3fecdd865c3cab79f42b19f5cc59a8-1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-0e3fecdd865c3cab79f42b19f5cc59a8-1"' :
                                            'id="xs-controllers-links-module-AppModule-0e3fecdd865c3cab79f42b19f5cc59a8-1"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-0e3fecdd865c3cab79f42b19f5cc59a8-1"' : 'data-target="#xs-injectables-links-module-AppModule-0e3fecdd865c3cab79f42b19f5cc59a8-1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-0e3fecdd865c3cab79f42b19f5cc59a8-1"' :
                                        'id="xs-injectables-links-module-AppModule-0e3fecdd865c3cab79f42b19f5cc59a8-1"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DubboModule.html" data-type="entity-link">DubboModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MainModule.html" data-type="entity-link">MainModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-MainModule-58785f0b414d274db2c9f0ed4a953bad"' : 'data-target="#xs-controllers-links-module-MainModule-58785f0b414d274db2c9f0ed4a953bad"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MainModule-58785f0b414d274db2c9f0ed4a953bad"' :
                                            'id="xs-controllers-links-module-MainModule-58785f0b414d274db2c9f0ed4a953bad"' }>
                                            <li class="link">
                                                <a href="controllers/MainController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MainModule-58785f0b414d274db2c9f0ed4a953bad"' : 'data-target="#xs-injectables-links-module-MainModule-58785f0b414d274db2c9f0ed4a953bad"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MainModule-58785f0b414d274db2c9f0ed4a953bad"' :
                                        'id="xs-injectables-links-module-MainModule-58785f0b414d274db2c9f0ed4a953bad"' }>
                                        <li class="link">
                                            <a href="injectables/MainService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MainService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RedisModule.html" data-type="entity-link">RedisModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link">UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-b015a2934efffb95e70ad7658988928d"' : 'data-target="#xs-controllers-links-module-UserModule-b015a2934efffb95e70ad7658988928d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-b015a2934efffb95e70ad7658988928d"' :
                                            'id="xs-controllers-links-module-UserModule-b015a2934efffb95e70ad7658988928d"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-b015a2934efffb95e70ad7658988928d"' : 'data-target="#xs-injectables-links-module-UserModule-b015a2934efffb95e70ad7658988928d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-b015a2934efffb95e70ad7658988928d"' :
                                        'id="xs-injectables-links-module-UserModule-b015a2934efffb95e70ad7658988928d"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ActivityInstantDTO.html" data-type="entity-link">ActivityInstantDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/GameDetailDto.html" data-type="entity-link">GameDetailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link">HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/ModuleDetailDto.html" data-type="entity-link">ModuleDetailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReqTypeDto.html" data-type="entity-link">ReqTypeDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ErrorsInterceptor.html" data-type="entity-link">ErrorsInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Logger.html" data-type="entity-link">Logger</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerMiddleware.html" data-type="entity-link">LoggerMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggingInterceptor.html" data-type="entity-link">LoggingInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResInterceptor.html" data-type="entity-link">ResInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValidationPipe.html" data-type="entity-link">ValidationPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/UserGuard.html" data-type="entity-link">UserGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/adInterface.html" data-type="entity-link">adInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CallBackDTO.html" data-type="entity-link">CallBackDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CmsDTO.html" data-type="entity-link">CmsDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/configInterface.html" data-type="entity-link">configInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ElementDTO.html" data-type="entity-link">ElementDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExtendInfoDTO.html" data-type="entity-link">ExtendInfoDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/extraInfoDTO.html" data-type="entity-link">extraInfoDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GameInfoDto.html" data-type="entity-link">GameInfoDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GiftDto.html" data-type="entity-link">GiftDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GiftSchemaDTO.html" data-type="entity-link">GiftSchemaDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InfoDTO.html" data-type="entity-link">InfoDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoggerService.html" data-type="entity-link">LoggerService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/mainInterface.html" data-type="entity-link">mainInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModuleDTO.html" data-type="entity-link">ModuleDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/provideInterface.html" data-type="entity-link">provideInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/provider.html" data-type="entity-link">provider</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/provider-1.html" data-type="entity-link">provider</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RedisBackDTO.html" data-type="entity-link">RedisBackDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/requestParamsDTO.html" data-type="entity-link">requestParamsDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/resInterface.html" data-type="entity-link">resInterface</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});