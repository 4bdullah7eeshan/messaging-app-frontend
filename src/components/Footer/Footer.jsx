import { Github } from 'lucide-react';

function Footer() {
    return (
        <footer>
            <div>
                <p>Copyright &copy; Abdullah Zeeshan 2024</p>
            </div>
            <div>
                <a
                    href="https://github.com/4bdullah7eeshan"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                >
                    <Github />
                </a>
            </div>
        </footer>
    );
}

export default Footer;