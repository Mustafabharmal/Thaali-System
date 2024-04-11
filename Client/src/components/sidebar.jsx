import React from "react";
import logo from "../assets/static/logo.svg";
import { NavLink, useLocation } from 'react-router-dom';

function Sidebar() {
    const location = useLocation();
    const path = location.pathname;
    return (
        <>
            <header className="navbar navbar-expand-md d-print-none">
                <div className="container-xl">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbar-menu"
                        aria-controls="navbar-menu"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3"> */}
                        <a href=".">
                            <img
                                src={logo}
                                width="160"
                                height="50"
                                alt="LOGO"
                                // className="navbar-brand-image"
                            />
                        </a>
                    {/* </h1> */}
                    <div className="navbar-nav flex-row order-md-last">
                        <div className="nav-item d-none d-md-flex me-3">
                            <div className="btn-list">
                                <div className="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
                                    <form
                                        action="./"
                                        method="get"
                                        autoComplete="off"
                                        noValidate
                                    >
                                        <div className="input-icon">
                                            <span className="input-icon-addon">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="icon"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="2"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path
                                                        stroke="none"
                                                        d="M0 0h24v24H0z"
                                                        fill="none"
                                                    />
                                                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                                                    <path d="M21 21l-6 -6" />
                                                </svg>
                                            </span>
                                            <input
                                                type="text"
                                                defaultValue=""
                                                className="form-control"
                                                placeholder="Search…"
                                                aria-label="Search in website"
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* <div className="d-none d-md-flex">
                            <a
                                href="?theme=dark"
                                className="nav-link px-0 hide-theme-dark"
                                title="Enable dark mode"
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                    />
                                    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                                </svg>
                            </a>
                            <a
                                href="?theme=light"
                                className="nav-link px-0 hide-theme-light"
                                title="Enable light mode"
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                    />
                                    <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                                    <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
                                </svg>
                            </a>
                            <div className="nav-item dropdown d-none d-md-flex me-3">
                                <a
                                    href="#"
                                    className="nav-link px-0"
                                    data-bs-toggle="dropdown"
                                    tabIndex="-1"
                                    aria-label="Show notifications"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="icon"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path
                                            stroke="none"
                                            d="M0 0h24v24H0z"
                                            fill="none"
                                        />
                                        <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                                        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                                    </svg>
                                    <span className="badge bg-red"></span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">
                                                Last updates
                                            </h3>
                                        </div>
                                        <div className="list-group list-group-flush list-group-hoverable">
                                            <div className="list-group-item">
                                                <div className="row align-items-center">
                                                    <div className="col-auto">
                                                        <span className="status-dot status-dot-animated bg-red d-block"></span>
                                                    </div>
                                                    <div className="col text-truncate">
                                                        <a
                                                            href="#"
                                                            className="text-body d-block"
                                                        >
                                                            Example 1
                                                        </a>
                                                        <div className="d-block text-secondary text-truncate mt-n1">
                                                            Change deprecated
                                                            html tags to text
                                                            decoration
                                                            classNamees (#29604)
                                                        </div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <a
                                                            href="#"
                                                            className="list-group-item-actions"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="icon text-muted"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="2"
                                                                stroke="currentColor"
                                                                fill="none"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <path
                                                                    stroke="none"
                                                                    d="M0 0h24v24H0z"
                                                                    fill="none"
                                                                />
                                                                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="list-group-item">
                                                <div className="row align-items-center">
                                                    <div className="col-auto">
                                                        <span className="status-dot d-block"></span>
                                                    </div>
                                                    <div className="col text-truncate">
                                                        <a
                                                            href="#"
                                                            className="text-body d-block"
                                                        >
                                                            Example 2
                                                        </a>
                                                        <div className="d-block text-secondary text-truncate mt-n1">
                                                            justify-content:between
                                                            ⇒
                                                            justify-content:space-between
                                                            (#29734)
                                                        </div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <a
                                                            href="#"
                                                            className="list-group-item-actions show"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="icon text-yellow"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="2"
                                                                stroke="currentColor"
                                                                fill="none"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <path
                                                                    stroke="none"
                                                                    d="M0 0h24v24H0z"
                                                                    fill="none"
                                                                />
                                                                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="list-group-item">
                                                <div className="row align-items-center">
                                                    <div className="col-auto">
                                                        <span className="status-dot d-block"></span>
                                                    </div>
                                                    <div className="col text-truncate">
                                                        <a
                                                            href="#"
                                                            className="text-body d-block"
                                                        >
                                                            Example 3
                                                        </a>
                                                        <div className="d-block text-secondary text-truncate mt-n1">
                                                            Update
                                                            change-version.js
                                                            (#29736)
                                                        </div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <a
                                                            href="#"
                                                            className="list-group-item-actions"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="icon text-muted"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="2"
                                                                stroke="currentColor"
                                                                fill="none"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <path
                                                                    stroke="none"
                                                                    d="M0 0h24v24H0z"
                                                                    fill="none"
                                                                />
                                                                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="list-group-item">
                                                <div className="row align-items-center">
                                                    <div className="col-auto">
                                                        <span className="status-dot status-dot-animated bg-green d-block"></span>
                                                    </div>
                                                    <div className="col text-truncate">
                                                        <a
                                                            href="#"
                                                            className="text-body d-block"
                                                        >
                                                            Example 4
                                                        </a>
                                                        <div className="d-block text-secondary text-truncate mt-n1">
                                                            Regenerate
                                                            package-lock.json
                                                            (#29730)
                                                        </div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <a
                                                            href="#"
                                                            className="list-group-item-actions"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="icon text-muted"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="2"
                                                                stroke="currentColor"
                                                                fill="none"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <path
                                                                    stroke="none"
                                                                    d="M0 0h24v24H0z"
                                                                    fill="none"
                                                                />
                                                                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className="nav-item dropdown">
                            <a
                                href="#"
                                className="nav-link d-flex lh-1 text-reset p-0"
                                data-bs-toggle="dropdown"
                                aria-label="Open user menu"
                            >
                                {/* <span className="avatar avatar-sm" style="BackgroundImage: url(./src/assets/static/avatars/000m.jpg)"></span> */}
                                <span
                                    className="avatar avatar-sm"
                                    style={{
                                        backgroundImage:
                                            "url('./src/assets/static/avatars/me.jpg')",
                                    }}
                                ></span>
                                <div className="d-none d-xl-block ps-2">
                                    <div>Mustafa Bharmal</div>
                                    <div className="mt-1 small text-secondary">
                                        Admin
                                    </div>
                                </div>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                <a href="#" className="dropdown-item">
                                    Status
                                </a>
                                <a
                                    href="./profile.html"
                                    className="dropdown-item"
                                >
                                    Profile
                                </a>
                                <a href="#" className="dropdown-item">
                                    Feedback
                                </a>
                                <div className="dropdown-divider"></div>
                                <a
                                    href="./settings.html"
                                    className="dropdown-item"
                                >
                                    Settings
                                </a>
                                <a
                                    href="./sign-in.html"
                                    className="dropdown-item"
                                >
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <header className="navbar-expand-md">
                <div className="collapse navbar-collapse" id="navbar-menu">
                    <div className="navbar">
                        <div className="container-xl">
                            <ul className="navbar-nav">
                            <li className={`nav-item ${path === '/' ? 'active' : ''}`}>
                                 <a className="nav-link" href="./">
                                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="icon"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path
                                                    stroke="none"
                                                    d="M0 0h24v24H0z"
                                                    fill="none"
                                                />
                                                <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                                                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                                                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                                            </svg>
                                        </span>
                                        <span className="nav-link-title">
                                            Home
                                        </span>
                                    </a>
                                </li>
                                <li className={`nav-item ${path.startsWith('/user') ? 'active' : ''}`}>
                                    <a className="nav-link" href="/user">
                                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="icon icon-tabler icon-tabler-user-square-rounded"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path
                                                    stroke="none"
                                                    d="M0 0h24v24H0z"
                                                    fill="none"
                                                />
                                                <path d="M12 13a3 3 0 1 0 0 -6a3 3 0 0 0 0 6z" />
                                                <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                                                <path d="M6 20.05v-.05a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v.05" />
                                            </svg>
                                        </span>
                                        <span className="nav-link-title">
                                            User
                                        </span>
                                    </a>
                                </li>
                                <li className={`nav-item ${path.startsWith('/community') ? 'active' : ''}`}>
                                    <a className="nav-link" href="/community">
                                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-map-pins" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M10.828 9.828a4 4 0 1 0 -5.656 0l2.828 2.829l2.828 -2.829z" />
  <path d="M8 7l0 .01" />
  <path d="M18.828 17.828a4 4 0 1 0 -5.656 0l2.828 2.829l2.828 -2.829z" />
  <path d="M16 15l0 .01" />
</svg>
                                        </span>
                                        <span className="nav-link-title">
                                        Community
                                        </span>
                                    </a>
                                </li>
                                <li className={`nav-item ${path.startsWith('/variety') ? 'active' : ''}`}>
                                    <a className="nav-link" href="/variety">
                                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-components" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12l3 3l3 -3l-3 -3z" /><path d="M15 12l3 3l3 -3l-3 -3z" /><path d="M9 6l3 3l3 -3l-3 -3z" /><path d="M9 18l3 3l3 -3l-3 -3z" /></svg>
                                        </span>
                                        <span className="nav-link-title">
                                        Variety
                                        </span>
                                    </a>
                                </li>
                                {/* <li className={`nav-item ${path.startsWith('/unit') ? 'active' : ''}`}>
                                    <a className="nav-link" href="/unit">
                                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-map-pins" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M10.828 9.828a4 4 0 1 0 -5.656 0l2.828 2.829l2.828 -2.829z" />
  <path d="M8 7l0 .01" />
  <path d="M18.828 17.828a4 4 0 1 0 -5.656 0l2.828 2.829l2.828 -2.829z" />
  <path d="M16 15l0 .01" />
</svg>
                                        </span>
                                        <span className="nav-link-title">
                                        Unit
                                        </span>
                                    </a>
                                </li> */}
                                {/* <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#navbar-base"
                                        data-bs-toggle="dropdown"
                                        data-bs-auto-close="outside"
                                        role="button"
                                        aria-expanded="false"
                                    >
                                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="icon"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path
                                                    stroke="none"
                                                    d="M0 0h24v24H0z"
                                                    fill="none"
                                                />
                                                <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
                                                <path d="M12 12l8 -4.5" />
                                                <path d="M12 12l0 9" />
                                                <path d="M12 12l-8 -4.5" />
                                                <path d="M16 5.25l-8 4.5" />
                                            </svg>
                                        </span>
                                        <span className="nav-link-title">
                                            Interface
                                        </span>
                                    </a>
                                    <div className="dropdown-menu">
                                        <div className="dropdown-menu-columns">
                                            <div className="dropdown-menu-column">
                                                <a
                                                    className="dropdown-item"
                                                    href="./alerts.html"
                                                >
                                                    Alerts
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./accordion.html"
                                                >
                                                    Accordion
                                                </a>
                                                <div className="dropend">
                                                    <a
                                                        className="dropdown-item dropdown-toggle"
                                                        href="#sidebar-authentication"
                                                        data-bs-toggle="dropdown"
                                                        data-bs-auto-close="outside"
                                                        role="button"
                                                        aria-expanded="false"
                                                    >
                                                        Authentication
                                                    </a>
                                                    <div className="dropdown-menu">
                                                        <a
                                                            href="./sign-in.html"
                                                            className="dropdown-item"
                                                        >
                                                            Sign in
                                                        </a>
                                                        <a
                                                            href="./sign-in-link.html"
                                                            className="dropdown-item"
                                                        >
                                                            Sign in link
                                                        </a>
                                                        <a
                                                            href="./sign-in-illustration.html"
                                                            className="dropdown-item"
                                                        >
                                                            Sign in with
                                                            illustration
                                                        </a>
                                                        <a
                                                            href="./sign-in-cover.html"
                                                            className="dropdown-item"
                                                        >
                                                            Sign in with cover
                                                        </a>
                                                        <a
                                                            href="./sign-up.html"
                                                            className="dropdown-item"
                                                        >
                                                            Sign up
                                                        </a>
                                                        <a
                                                            href="./forgot-password.html"
                                                            className="dropdown-item"
                                                        >
                                                            Forgot password
                                                        </a>
                                                        <a
                                                            href="./terms-of-service.html"
                                                            className="dropdown-item"
                                                        >
                                                            Terms of service
                                                        </a>
                                                        <a
                                                            href="./auth-lock.html"
                                                            className="dropdown-item"
                                                        >
                                                            Lock screen
                                                        </a>
                                                        <a
                                                            href="./2-step-verification.html"
                                                            className="dropdown-item"
                                                        >
                                                            2 step verification
                                                        </a>
                                                        <a
                                                            href="./2-step-verification-code.html"
                                                            className="dropdown-item"
                                                        >
                                                            2 step verification
                                                            code
                                                        </a>
                                                    </div>
                                                </div>
                                                <a
                                                    className="dropdown-item"
                                                    href="./blank.html"
                                                >
                                                    Blank page
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./badges.html"
                                                >
                                                    Badges
                                                    <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                                                        New
                                                    </span>
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./buttons.html"
                                                >
                                                    Buttons
                                                </a>
                                                <div className="dropend">
                                                    <a
                                                        className="dropdown-item dropdown-toggle"
                                                        href="#sidebar-cards"
                                                        data-bs-toggle="dropdown"
                                                        data-bs-auto-close="outside"
                                                        role="button"
                                                        aria-expanded="false"
                                                    >
                                                        Cards
                                                        <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                                                            New
                                                        </span>
                                                    </a>
                                                    <div className="dropdown-menu">
                                                        <a
                                                            href="./cards.html"
                                                            className="dropdown-item"
                                                        >
                                                            Sample cards
                                                        </a>
                                                        <a
                                                            href="./card-actions.html"
                                                            className="dropdown-item"
                                                        >
                                                            Card actions
                                                            <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                                                                New
                                                            </span>
                                                        </a>
                                                        <a
                                                            href="./cards-masonry.html"
                                                            className="dropdown-item"
                                                        >
                                                            Cards Masonry
                                                        </a>
                                                    </div>
                                                </div>
                                                <a
                                                    className="dropdown-item"
                                                    href="./carousel.html"
                                                >
                                                    Carousel
                                                    <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                                                        New
                                                    </span>
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./charts.html"
                                                >
                                                    Charts
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./colors.html"
                                                >
                                                    Colors
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./colorpicker.html"
                                                >
                                                    Color picker
                                                    <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                                                        New
                                                    </span>
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./datagrid.html"
                                                >
                                                    Data grid
                                                    <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                                                        New
                                                    </span>
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./datatables.html"
                                                >
                                                    Datatables
                                                    <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                                                        New
                                                    </span>
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./dropdowns.html"
                                                >
                                                    Dropdowns
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./dropzone.html"
                                                >
                                                    Dropzone
                                                    <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                                                        New
                                                    </span>
                                                </a>
                                                <div className="dropend">
                                                    <a
                                                        className="dropdown-item dropdown-toggle"
                                                        href="#sidebar-error"
                                                        data-bs-toggle="dropdown"
                                                        data-bs-auto-close="outside"
                                                        role="button"
                                                        aria-expanded="false"
                                                    >
                                                        Error pages
                                                    </a>
                                                    <div className="dropdown-menu">
                                                        <a
                                                            href="./error-404.html"
                                                            className="dropdown-item"
                                                        >
                                                            404 page
                                                        </a>
                                                        <a
                                                            href="./error-500.html"
                                                            className="dropdown-item"
                                                        >
                                                            500 page
                                                        </a>
                                                        <a
                                                            href="./error-maintenance.html"
                                                            className="dropdown-item"
                                                        >
                                                            Maintenance page
                                                        </a>
                                                    </div>
                                                </div>
                                                <a
                                                    className="dropdown-item"
                                                    href="./flags.html"
                                                >
                                                    Flags
                                                    <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                                                        New
                                                    </span>
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./inline-player.html"
                                                >
                                                    Inline player
                                                    <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                                                        New
                                                    </span>
                                                </a>
                                            </div>
                                            <div className="dropdown-menu-column">
                                                <a
                                                    className="dropdown-item"
                                                    href="./lightbox.html"
                                                >
                                                    Lightbox
                                                    <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                                                        New
                                                    </span>
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./lists.html"
                                                >
                                                    Lists
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./modals.html"
                                                >
                                                    Modal
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./maps.html"
                                                >
                                                    Map
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./map-fullsize.html"
                                                >
                                                    Map fullsize
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./maps-vector.html"
                                                >
                                                    Map vector
                                                    <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                                                        New
                                                    </span>
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./markdown.html"
                                                >
                                                    Markdown
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./navigation.html"
                                                >
                                                    Navigation
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./offcanvas.html"
                                                >
                                                    Offcanvas
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./pagination.html"
                                                >
                                                    Pagination
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./placeholder.html"
                                                >
                                                    Placeholder
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./steps.html"
                                                >
                                                    Steps
                                                    <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                                                        New
                                                    </span>
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./stars-rating.html"
                                                >
                                                    Stars rating
                                                    <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                                                        New
                                                    </span>
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./tabs.html"
                                                >
                                                    Tabs
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./tags.html"
                                                >
                                                    Tags
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./tables.html"
                                                >
                                                    Tables
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./typography.html"
                                                >
                                                    Typography
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./tinymce.html"
                                                >
                                                    TinyMCE
                                                    <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                                                        New
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        href="./form-elements.html"
                                    >
                                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="icon"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path
                                                    stroke="none"
                                                    d="M0 0h24v24H0z"
                                                    fill="none"
                                                />
                                                <path d="M9 11l3 3l8 -8" />
                                                <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
                                            </svg>
                                        </span>
                                        <span className="nav-link-title">
                                            Form elements
                                        </span>
                                    </a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#navbar-extra"
                                        data-bs-toggle="dropdown"
                                        data-bs-auto-close="outside"
                                        role="button"
                                        aria-expanded="false"
                                    >
                                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="icon"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path
                                                    stroke="none"
                                                    d="M0 0h24v24H0z"
                                                    fill="none"
                                                />
                                                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                                            </svg>
                                        </span>
                                        <span className="nav-link-title">
                                            Extra
                                        </span>
                                    </a>
                                    <div className="dropdown-menu">
                                        <div className="dropdown-menu-columns">
                                            <div className="dropdown-menu-column">
                                                <a
                                                    className="dropdown-item"
                                                    href="./empty.html"
                                                >
                                                    Empty page
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./cookie-banner.html"
                                                >
                                                    Cookie banner
                                                    <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                                                        New
                                                    </span>
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./chat.html"
                                                >
                                                    Chat
                                                    <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                                                        New
                                                    </span>
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./activity.html"
                                                >
                                                    Activity
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./gallery.html"
                                                >
                                                    Gallery
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./invoice.html"
                                                >
                                                    Invoice
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./search-results.html"
                                                >
                                                    Search results
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./pricing.html"
                                                >
                                                    Pricing cards
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./pricing-table.html"
                                                >
                                                    Pricing table
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./faq.html"
                                                >
                                                    FAQ
                                                    <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                                                        New
                                                    </span>
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./users.html"
                                                >
                                                    Users
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./license.html"
                                                >
                                                    License
                                                </a>
                                            </div>
                                            <div className="dropdown-menu-column">
                                                <a
                                                    className="dropdown-item"
                                                    href="./logs.html"
                                                >
                                                    Logs
                                                    <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                                                        New
                                                    </span>
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./music.html"
                                                >
                                                    Music
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./photogrid.html"
                                                >
                                                    Photogrid
                                                    <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                                                        New
                                                    </span>
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./tasks.html"
                                                >
                                                    Tasks
                                                    <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                                                        New
                                                    </span>
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./uptime.html"
                                                >
                                                    Uptime monitor
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./widgets.html"
                                                >
                                                    Widgets
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./wizard.html"
                                                >
                                                    Wizard
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./settings.html"
                                                >
                                                    Settings
                                                    <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                                                        New
                                                    </span>
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./trial-ended.html"
                                                >
                                                    Trial ended
                                                    <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                                                        New
                                                    </span>
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./job-listing.html"
                                                >
                                                    Job listing
                                                    <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                                                        New
                                                    </span>
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./page-loader.html"
                                                >
                                                    Page loader
                                                    <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                                                        New
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#navbar-layout"
                                        data-bs-toggle="dropdown"
                                        data-bs-auto-close="outside"
                                        role="button"
                                        aria-expanded="false"
                                    >
                                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="icon"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path
                                                    stroke="none"
                                                    d="M0 0h24v24H0z"
                                                    fill="none"
                                                />
                                                <path d="M4 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                                                <path d="M4 13m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                                                <path d="M14 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                                                <path d="M14 15m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                                            </svg>
                                        </span>
                                        <span className="nav-link-title">
                                            Layout
                                        </span>
                                    </a>
                                    <div className="dropdown-menu">
                                        <div className="dropdown-menu-columns">
                                            <div className="dropdown-menu-column">
                                                <a
                                                    className="dropdown-item"
                                                    href="./layout-horizontal.html"
                                                >
                                                    Horizontal
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./layout-boxed.html"
                                                >
                                                    Boxed
                                                    <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                                                        New
                                                    </span>
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./layout-vertical.html"
                                                >
                                                    Vertical
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./layout-vertical-transparent.html"
                                                >
                                                    Vertical transparent
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./layout-vertical-right.html"
                                                >
                                                    Right vertical
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./layout-condensed.html"
                                                >
                                                    Condensed
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./layout-combo.html"
                                                >
                                                    Combined
                                                </a>
                                            </div>
                                            <div className="dropdown-menu-column">
                                                <a
                                                    className="dropdown-item"
                                                    href="./layout-navbar-dark.html"
                                                >
                                                    Navbar dark
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./layout-navbar-sticky.html"
                                                >
                                                    Navbar sticky
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./layout-navbar-overlap.html"
                                                >
                                                    Navbar overlap
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./layout-rtl.html"
                                                >
                                                    RTL mode
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./layout-fluid.html"
                                                >
                                                    Fluid
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href="./layout-fluid-vertical.html"
                                                >
                                                    Fluid vertical
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="./icons.html">
                                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="icon"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path
                                                    stroke="none"
                                                    d="M0 0h24v24H0z"
                                                    fill="none"
                                                />
                                                <path d="M5 11a7 7 0 0 1 14 0v7a1.78 1.78 0 0 1 -3.1 1.4a1.65 1.65 0 0 0 -2.6 0a1.65 1.65 0 0 1 -2.6 0a1.65 1.65 0 0 0 -2.6 0a1.78 1.78 0 0 1 -3.1 -1.4v-7" />
                                                <path d="M10 10l.01 0" />
                                                <path d="M14 10l.01 0" />
                                                <path d="M10 14a3.5 3.5 0 0 0 4 0" />
                                            </svg>
                                        </span>
                                        <span className="nav-link-title">
                                            4637 icons
                                        </span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        href="./emails.html"
                                    >
                                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="icon"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path
                                                    stroke="none"
                                                    d="M0 0h24v24H0z"
                                                    fill="none"
                                                />
                                                <path d="M3 9l9 6l9 -6l-9 -6l-9 6" />
                                                <path d="M21 9v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" />
                                                <path d="M3 19l6 -6" />
                                                <path d="M15 13l6 6" />
                                            </svg>
                                        </span>
                                        <span className="nav-link-title">
                                            Email templates
                                        </span>
                                    </a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#navbar-help"
                                        data-bs-toggle="dropdown"
                                        data-bs-auto-close="outside"
                                        role="button"
                                        aria-expanded="false"
                                    >
                                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="icon"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path
                                                    stroke="none"
                                                    d="M0 0h24v24H0z"
                                                    fill="none"
                                                />
                                                <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                                                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                                <path d="M15 15l3.35 3.35" />
                                                <path d="M9 15l-3.35 3.35" />
                                                <path d="M5.65 5.65l3.35 3.35" />
                                                <path d="M18.35 5.65l-3.35 3.35" />
                                            </svg>
                                        </span>
                                        <span className="nav-link-title">
                                            Help
                                        </span>
                                    </a>
                                    <div className="dropdown-menu">
                                        <a
                                            className="dropdown-item"
                                            href="https://tabler.io/docs"
                                            target="_blank"
                                            rel="noopener"
                                        >
                                            Documentation
                                        </a>
                                        <a
                                            className="dropdown-item"
                                            href="./changelog.html"
                                        >
                                            Changelog
                                        </a>
                                        <a
                                            className="dropdown-item"
                                            href="https://github.com/tabler/tabler"
                                            target="_blank"
                                            rel="noopener"
                                        >
                                            Source code
                                        </a>
                                        <a
                                            className="dropdown-item text-pink"
                                            href="https://github.com/sponsors/codecalm"
                                            target="_blank"
                                            rel="noopener"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="icon icon-inline me-1"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path
                                                    stroke="none"
                                                    d="M0 0h24v24H0z"
                                                    fill="none"
                                                />
                                                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                            </svg>
                                            Sponsor project!
                                        </a>
                                    </div>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
export default Sidebar;
