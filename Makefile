VERSION=0.0.1
NOMBRE="compartir-api"

N=[0m
G=[01;32m
Y=[01;33m
B=[01;34m


comandos:
	@echo ""
	@echo "${B}Comandos disponibles para ${Y}${NOMBRE}${N} (versión: ${VERSION})"
	@echo ""
	@echo "  ${Y}Para desarrolladores${N}"
	@echo ""
	@echo "    ${G}iniciar${N}         Instala dependencias."
	@echo "    ${G}live${N}            Ejecuta la aplicación y se reinicia automáticamente."
	@echo ""
	@echo "    ${G}version${N}         Aumenta la versión."
	@echo "    ${G}utest${N}            Ejecuta los tests de unidad."
	@echo "    ${G}ejecutar${N}        Ejecuta la aplicación."
	@echo ""

iniciar:
	npm install

ejecutar:
	npm start

live:
	npm watch

version:
	@npm version patch
	@make changelog
	@git push --tags
	@git push

changelog:
	@git log `git describe --tags --abbrev=0` --pretty=format:"  * %s" > CHANGELOG.txt
	@echo "Generando el archivo CHANGELOG.txt"

utest:
	npm test

.PHONY: utest
