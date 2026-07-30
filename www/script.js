/* Polyfill Array.prototype.find para WebView antiguo */
if (typeof Array.prototype.find !== 'function') { Array.prototype.find = function(fn) { for (var i = 0; i < this.length; i++) { if (fn(this[i], i, this)) return this[i]; } }; }
/* Polyfill Element.closest para muy antiguos */
if (typeof Element.prototype.closest !== 'function') { Element.prototype.closest = function(s) { var el = this; do { if (el.matches(s)) return el; el = el.parentElement || el.parentNode; } while (el !== null); return null; }; }

var langData = {
  en: {
    notes:'Notes', diary:'Diary', board:'Board', boards:'Boards', studyCards:'Study Cards', settings:'Settings', rename:'Rename',
    newSet:'New Set', editSet:'Edit Set', deleteSet:'Delete Set', addCard:'Add Card',
    front:'Front', back:'Back', know:'Know', dontKnow:'Don\'t Know',
    noCards:'No cards yet', study:'Study', edit:'Edit', del:'Delete',
    setName:'Set name', enterSetName:'Enter set name', cardList:'Cards', backToSets:'Back to Sets', showAnswer:'Click to reveal',
    darkTheme:'Dark theme', lightTheme:'Light theme',
    cancel:'Cancel', create:'Create', confirm:'Confirm', close:'Close', understood:'Got it',
    newNote:'New Note', newBoard:'New Board', title:'Title', name:'Name',
    passwordOptional:'Password (optional)', enterPassword:'Enter password',
    protectedNote:'Protected note: ', protectedBoard:'Protected board: ',
    deleteNote:'Delete note: ', deleteBoard:'Delete board: ',
    noteInFavorites:'Note in favorites',
    unfavoriteToDelete:'You must remove it from favorites before deleting.',
    wrongPassword:'Incorrect password',
    addFav:'Add to favorites', removeFav:'Remove from favorites',
    exportPdf:'Export PDF', connect:'Connect',
     addItem:'Add item', addText:'Add text', insertImage:'Insert image', 
    addCover:'Add cover', removeCover:'Remove cover', coverTooLarge:'Image too large. Max 5MB.',
    bold:'Bold (Ctrl+B)', italic:'Italic (Ctrl+I)', underline:'Underline (Ctrl+U)', highlight:'Highlight', bulletList:'Bullet list', numberedList:'Numbered list',
    bg:'Bg', postit:'Post-it', cork:'Cork', white:'White', black:'Black', green:'Green (board)', exportToPdf:'Export to PDF', export:'Export', studyCards:'Study Cards', resetZoom:'Reset zoom',
    noteTitlePlaceholder:'Note title', boardNamePlaceholder:'Board name', leaveEmpty:'Leave empty if no password',
    passwordProtected:'Password protected', noContent:'No content',
    noNotes:'No notes yet.', noBoards:'No boards yet.', noDiaryEntries:'No diary entries.',
    newNoteLabel:'New note', newBoardLabel:'New board',
    addItemsPrompt:'Add items to your note',
    textPlaceholder:'Write your text here...', itemPlaceholder:'Write here...',
    back:'Back', selectNote:'Select or create a note', selectBoard:'Select or create a board',
    exported:'Exported: ', printError:'Error printing', processingExport:'Your note is being processed',
    needPostits:'Need at least 2 post-its',
    insertEquation:'Insert equation', equationEditor:'Equation editor', save:'Save',
    equationError:'Equation contains errors', editEquation:'Edit equation',
    latexPreview:'Preview', boardInsertEquation:'Insert equation', equationPlaceholder:'Write LaTeX here...',
    clickDestiny:'Click on destination post-it',
    connectionCreated:'Connection created', connectionExists:'Connection already exists',
    chooseOther:'Choose another post-it',
    diarySection:'Diary', language:'Language',
    cafecitoDesc:'The Library of Babel is infinite. The resources to develop it are not. If MiBabel is useful to you, you can help keep building it.',
    libro:'A book', estante:'A shelf', galeria:'A gallery', salaBabel:'A Babel room',
    trash:'Trash', trashEmpty:'Trash is empty.', trashSubtitle:'Deleted items are automatically removed after 30 days.',
    restore:'Restore', deletePermanent:'Delete', confirmDeletePermanent:'Delete permanently?',
    trashDaysLeft:'Deleted in ', trashDaysUnit:' day(s)', trashDeletedSoon:'Will be deleted soon',
    trashTypeNote:'Note', trashTypeBoard:'Board', trashTypeStudySet:'Study Cards',
    linkHelpTitle:'Links between notes & URLs', linkToNote:'Links to another note', linkToUrl:'Links to an external URL',
    diaryPwdLabel:'Diary password', diaryPwdSet:'\uD83D\uDD12 Password set', diaryPwdChange:'Change', diaryPwdRemove:'Remove', diaryPwdNone:'No password', diaryPwdSetBtn:'Set',
    diaryPwdSetTitle:'Set diary password', diaryPwdChangeTitle:'Change diary password', diaryPwdRemoveTitle:'Remove diary password',
    diaryPwdOldLabel:'Current password', diaryPwdNewLabel:'New password',
    diaryPwdAlertEmpty:'Enter a password.', diaryPwdAlertWrong:'Current password is incorrect.', diaryPwdAlertNewEmpty:'Enter the new password.',
    diaryProtected:'Diary notes are protected', diaryForgotPwd:'Forgot password?',
    recoveryPrompt:'Enter your recovery code:', recoveryWrong:'Incorrect code.',
    recoveryDialogTitle:'Recovery code', recoveryDialogMsg:'Save this code in a safe place. If you forget your password, you can use it to recover access to your diary notes.', recoveryDialogBtn:'I saved it',
    migrateLabel:'Migrate data', exportBtn:'Export data', importBtn:'Import data',
    save:'Save', preview:'Preview:', insert:'Insert', newSetTitle:'New Set',
    insertTable:'Table', mergeCells:'Merge', splitCell:'Split', alignLeft:'Left', alignCenter:'Center', alignRight:'Right', alignJustify:'Justify', tableRows:'Rows', tableCols:'Columns', createTable:'Create',
    months:['January','February','March','April','May','June','July','August','September','October','November','December'],
    dayAbbr:['Su','Mo','Tu','We','Th','Fr','Sa'],
    searchDate:'Search date (dd/mm/yyyy)',
    checkDownloads:'Check your Downloads folder',
    welcomeTitle:'Welcome to MiBabel',
    welcomeMsg:'Welcome to MiBabel, an independent project created by me, a student passionate about knowledge.<br><br>MiBabel was born mainly thinking of students. Thanks to its simplicity and its various tools, it seeks to become a study and organization companion. However, it is open to anyone who wishes to organize their ideas, projects and learning.<br><br>Its name is inspired by &quot;The Library of Babel&quot;, the famous story by Argentine writer and poet Jorge Luis Borges, which imagines an infinite library capable of containing all possible books.<br><br><i>&quot;The Library is a sphere whose exact center is any hexagon, whose circumference is inaccessible.&quot;</i><br><br>Excerpt from &quot;The Library of Babel&quot;, by Jorge Luis Borges.<br><br>MiBabel is a free, private application designed to be useful. If you find it valuable, you can contribute to its development and help this library continue to grow.',
    milestoneMsg:'If MiBabel is useful to you, I invite you to contribute so this library can keep growing.',
    milestoneBtn:'Not now',
     event:'Event', task:'Task', remindMe:'Remind me',
     everyWeek:'Every week', everyMonth:'Every month', everyYear:'Every year', everyDay:'Every day',
     noRepeat:'No repeat', pending:'Pending', completed:'Completed', type:'Type', repeat:'Repeat',
     insertAudio:'Insert audio', insertVideo:'Insert video',
     insertBoardImage:'Insert image', insertBoardAudio:'Insert audio', insertBoardVideo:'Insert video',
      audio:'Audio', video:'Video', fullsize:'Full size', modify:'Modify',
     duplicate:'Duplicate', sendToFront:'Bring to front', sendToBack:'Send to back',
      copyPaste:'Copy', paste:'Paste',
      insertEquation:'Insert equation', equationEditor:'Equation editor',
      equationError:'Equation contains errors', editEquation:'Edit equation',
      latexPreview:'Preview', boardInsertEquation:'Insert equation', equationPlaceholder:'Write LaTeX here...',
      stats:'Statistics', about:'About', totalNotes:'Total notes', totalBoards:'Total boards',
      totalStudySets:'Total study sets', totalPostits:'Total post-its', totalReminders:'Total reminders',
      totalWords:'Total words', versionLabel:'Version', licenses:'Licenses', changelog:'Changelog',
      developer:'Developer', contact:'Contact', privacy:'Privacy', boardNoShadows:'Hide shadows', reduceMotion:'Reduce motion',
      weekStartsMonday:'Week starts on Monday', defaultBoardBg:'Default board background',
      boardBgLabel:'Board background', boardShadowsLabel:'Show post-it shadows',
      boardAnimationsLabel:'Show animations', showStats:'Statistics', showAbout:'About',
      monday:'Monday', sunday:'Sunday',
      import:'Import', importSuccess:'Item imported successfully',
      invalidFile:'Invalid or corrupted file',
      uuidConflict:'An item with this ID already exists. A new ID will be generated.',
      exportNote:'Export as note', exportBoard:'Export as board', exportStudySet:'Export as card set'
    },
   es: {
    notes:'Notas', diary:'Diario', board:'Tablero', boards:'Tableros', studyCards:'Tarjetas de estudio', settings:'Ajustes', rename:'Renombrar',
    newSet:'Nuevo conjunto', editSet:'Editar conjunto', deleteSet:'Eliminar conjunto', addCard:'Agregar tarjeta',
    front:'Frente', back:'Reverso', know:'Sabia', dontKnow:'No sabia',
    noCards:'Sin tarjetas aun', study:'Estudiar', edit:'Editar', del:'Eliminar',
    setName:'Nombre del conjunto', enterSetName:'Ingrese nombre del conjunto', cardList:'Tarjetas', backToSets:'Volver a conjuntos', showAnswer:'Clic para ver respuesta',
    darkTheme:'Tema oscuro', lightTheme:'Tema claro',
    cancel:'Cancelar', create:'Crear', confirm:'Confirmar', close:'Cerrar', understood:'Entendido',
    newNote:'Nueva Nota', newBoard:'Nuevo Tablero', title:'Titulo', name:'Nombre',
    passwordOptional:'Contrasena (opcional)', enterPassword:'Ingresar contrasena',
    protectedNote:'Nota protegida: ', protectedBoard:'Tablero protegido: ',
    deleteNote:'Eliminar nota: ', deleteBoard:'Eliminar tablero: ',
    noteInFavorites:'Nota en favoritos',
    unfavoriteToDelete:'Debes descartarla de favoritos antes de eliminarla.',
    wrongPassword:'Contrasena incorrecta',
    addFav:'Anadir a favoritos', removeFav:'Quitar de favoritos',
    exportPdf:'Exportar PDF', connect:'Conectar',
     addItem:'Anadir item', addText:'Anadir texto', insertImage:'Insertar imagen',
    addCover:'Anadir caratula', removeCover:'Quitar caratula', coverTooLarge:'Imagen demasiado grande. Max 5MB.',
    bold:'Negrita (Ctrl+B)', italic:'Cursiva (Ctrl+I)', underline:'Subrayado (Ctrl+U)', highlight:'Resaltar', bulletList:'Lista con viñetas', numberedList:'Lista numerada',
    bg:'Fondo', postit:'Post-it', cork:'Corcho', white:'Blanco', black:'Negro', green:'Verde (pizarron)', exportToPdf:'Exportar a PDF', export:'Exportar', studyCards:'Tarjetas de estudio', resetZoom:'Restablecer zoom',
    noteTitlePlaceholder:'Titulo de la nota', boardNamePlaceholder:'Nombre del tablero', leaveEmpty:'Dejar vacio si no quiere',
    passwordProtected:'Protegido con contrasena', noContent:'Sin contenido',
    noNotes:'Todavia no hay notas.', noBoards:'Todavia no hay tableros.', noDiaryEntries:'No hay entradas en el diario.',
    newNoteLabel:'Nueva nota', newBoardLabel:'Nuevo tablero',
    addItemsPrompt:'Agrega items a tu nota',
    textPlaceholder:'Escribe tu texto aqui...', itemPlaceholder:'Escribe aqui...',
    back:'Volver', selectNote:'Selecciona o crea una nota', selectBoard:'Selecciona o crea un tablero',
    exported:'Exportado: ', printError:'Error al imprimir', processingExport:'Su nota est\u00e1 siendo procesada',
    needPostits:'Se necesitan al menos 2 post-its',
    clickDestiny:'Click en el post-it destino',
    connectionCreated:'Conexion creada', connectionExists:'Ya existe esa conexion',
    chooseOther:'Elige otro post-it',
    diarySection:'Diario', language:'Idioma',
    cafecitoDesc:'La Biblioteca de Babel es infinita. Los recursos para desarrollarla no. Si MiBabel te resulta \u00fatil, pod\u00e9s ayudar a seguir construy\u00e9ndola.',
    libro:'Un libro', estante:'Un estante', galeria:'Una galer\u00eda', salaBabel:'Una sala de Babel',
    trash:'Papelera', trashEmpty:'La papelera est\u00e1 vac\u00eda.', trashSubtitle:'Los elementos eliminados se borran autom\u00e1ticamente despu\u00e9s de 30 d\u00edas.',
    restore:'Restaurar', deletePermanent:'Eliminar', confirmDeletePermanent:'\u00bfEliminar permanentemente?',
    trashDaysLeft:'Se elimina en ', trashDaysUnit:' d\u00eda(s)', trashDeletedSoon:'Se eliminar\u00e1 pronto',
    trashTypeNote:'Nota', trashTypeBoard:'Tablero', trashTypeStudySet:'Tarjetas de estudio',
    linkHelpTitle:'Enlaces entre notas y URLs', linkToNote:'Vincula a otra nota', linkToUrl:'Vincula a una URL externa',
    diaryPwdLabel:'Contrase\u00f1a del diario', diaryPwdSet:'\uD83D\uDD12 Contrase\u00f1a establecida', diaryPwdChange:'Cambiar', diaryPwdRemove:'Eliminar', diaryPwdNone:'Sin contrase\u00f1a', diaryPwdSetBtn:'Establecer',
    diaryPwdSetTitle:'Establecer contrase\u00f1a del diario', diaryPwdChangeTitle:'Cambiar contrase\u00f1a del diario', diaryPwdRemoveTitle:'Eliminar contrase\u00f1a del diario',
    diaryPwdOldLabel:'Contrase\u00f1a actual', diaryPwdNewLabel:'Nueva contrase\u00f1a',
    diaryPwdAlertEmpty:'Ingresa una contrase\u00f1a.', diaryPwdAlertWrong:'Contrase\u00f1a actual incorrecta.', diaryPwdAlertNewEmpty:'Ingresa la nueva contrase\u00f1a.',
    diaryProtected:'Notas diarias protegidas', diaryForgotPwd:'\u00bfOlvidaste la contrase\u00f1a?',
    recoveryPrompt:'Ingresa tu c\u00f3digo de recuperaci\u00f3n:', recoveryWrong:'C\u00f3digo incorrecto.',
    recoveryDialogTitle:'C\u00f3digo de recuperaci\u00f3n', recoveryDialogMsg:'Guarda este c\u00f3digo en un lugar seguro. Si olvidas tu contrase\u00f1a, podr\u00e1s usarlo para recuperar el acceso a tus notas diarias.', recoveryDialogBtn:'Ya lo guard\u00e9',
    migrateLabel:'Migrar datos', exportBtn:'Exportar datos', importBtn:'Importar datos',
    save:'Guardar', preview:'Vista previa:', insert:'Insertar', newSetTitle:'Nuevo Conjunto',
    insertTable:'Tabla', mergeCells:'Fusionar', splitCell:'Dividir', alignLeft:'Izquierda', alignCenter:'Centro', alignRight:'Derecha', alignJustify:'Justificar', tableRows:'Filas', tableCols:'Columnas', createTable:'Crear',
    months:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    dayAbbr:['Do','Lu','Ma','Mi','Ju','Vi','Sa'],
    searchDate:'Buscar fecha (dd/mm/aaaa)',
    checkDownloads:'Revisa la carpeta de Descargas',
    welcomeTitle:'Bienvenido a MiBabel',
    welcomeMsg:'Te doy la bienvenida a MiBabel, un proyecto independiente creado por m\u00ed, un estudiante apasionado por el conocimiento.<br><br>MiBabel naci\u00f3 principalmente pensando para estudiantes. Gracias a su simplicidad y a sus diversas herramientas, busca convertirse en una compa\u00f1era de estudio y organizaci\u00f3n. Sin embargo, est\u00e1 abierta a cualquier persona que desee ordenar sus ideas, proyectos y aprendizajes.<br><br>Su nombre est\u00e1 inspirado en \u00abLa biblioteca de Babel\u00bb, el c\u00e9lebre cuento del escritor y poeta argentino Jorge Luis Borges, que imagina una biblioteca infinita capaz de contener todos los libros posibles.<br><br><i>\u00abLa Biblioteca es una esfera cuyo centro cabal es cualquier hex\u00e1gono, cuya circunferencia es inaccesible.\u00bb</i><br><br>Fragmento de \u00abLa biblioteca de Babel\u00bb, de Jorge Luis Borges.<br><br>MiBabel es una aplicaci\u00f3n gratuita, privada y dise\u00f1ada para ser \u00fatil. Si te resulta valiosa, pod\u00e9s contribuir a su desarrollo y ayudar a que esta biblioteca siga creciendo.',
    milestoneMsg:'Si te est\u00e1 resultando \u00fatil MiBabel, te invito a contribuir para que esta biblioteca siga creciendo.',
    milestoneBtn:'Ahora no',
      event:'Evento', task:'Tarea', remindMe:'Recuérdame',
      everyWeek:'Cada semana', everyMonth:'Cada mes', everyYear:'Cada año', everyDay:'Todos los días',
      noRepeat:'Sin repetición', pending:'Pendiente', completed:'Completada', type:'Tipo', repeat:'Repetición',
      insertAudio:'Insertar audio', insertVideo:'Insertar video',
      insertBoardImage:'Insertar imagen', insertBoardAudio:'Insertar audio', insertBoardVideo:'Insertar video',
      audio:'Audio', video:'Video', fullsize:'Tamaño completo', modify:'Modificar',
     duplicate:'Duplicar', sendToFront:'Enviar al frente', sendToBack:'Enviar al fondo',
      copyPaste:'Copiar', paste:'Pegar',
      insertEquation:'Insertar ecuaci\u00f3n', equationEditor:'Editor de ecuaci\u00f3n',
      equationError:'La ecuaci\u00f3n contiene errores', editEquation:'Editar ecuaci\u00f3n',
      latexPreview:'Vista previa', boardInsertEquation:'Insertar ecuaci\u00f3n', equationPlaceholder:'Escribe LaTeX aqu\u00ed...',
      stats:'Estad\u00edsticas', about:'Acerca de', totalNotes:'Total de notas', totalBoards:'Total de tableros',
      totalStudySets:'Total de conjuntos', totalPostits:'Total de post-its', totalReminders:'Total de recordatorios',
      totalWords:'Total de palabras', versionLabel:'Versi\u00f3n', licenses:'Licencias', changelog:'Registro de cambios',
      developer:'Desarrollador', contact:'Contacto', privacy:'Privacidad', boardNoShadows:'Ocultar sombras', reduceMotion:'Reducir movimiento',
      weekStartsMonday:'La semana empieza el lunes', defaultBoardBg:'Fondo de tablero predeterminado',
      boardBgLabel:'Fondo del tablero', boardShadowsLabel:'Mostrar sombras en post-its',
      boardAnimationsLabel:'Mostrar animaciones', showStats:'Estad\u00edsticas', showAbout:'Acerca de',
      monday:'Lunes', sunday:'Domingo',
      import:'Importar', importSuccess:'Elemento importado correctamente',
      invalidFile:'Archivo inv\u00e1lido o corrupto',
      uuidConflict:'Ya existe un elemento con este ID. Se generar\u00e1 un nuevo ID.',
      exportNote:'Exportar como nota', exportBoard:'Exportar como tablero', exportStudySet:'Exportar como set'
    },
   fr: {
    notes:'Notes', diary:'Journal', board:'Tableau', boards:'Tableaux', studyCards:'Cartes memoire', settings:'Parametres', rename:'Renommer',
    newSet:'Nouvel ensemble', editSet:'Modifier', deleteSet:'Supprimer', addCard:'Ajouter carte',
    front:'Recto', back:'Verso', know:'Su', dontKnow:'Pas su',
    noCards:'Aucune carte', study:'Etudier', edit:'Editer', del:'Supprimer',
    setName:'Nom', enterSetName:'Entrez le nom', cardList:'Cartes', backToSets:'Retour', showAnswer:'Cliquez pour voir',
    darkTheme:'Theme sombre', lightTheme:'Theme clair',
    cancel:'Annuler', create:'Creer', confirm:'Confirmer', close:'Fermer', understood:'Compris',
    newNote:'Nouvelle Note', newBoard:'Nouveau Tableau', title:'Titre', name:'Nom',
    passwordOptional:'Mot de passe (optionnel)', enterPassword:'Entrer le mot de passe',
    protectedNote:'Note protegee: ', protectedBoard:'Tableau protege: ',
    deleteNote:'Supprimer la note: ', deleteBoard:'Supprimer le tableau: ',
    noteInFavorites:'Note dans les favoris',
    unfavoriteToDelete:'Retirez-la des favoris avant de supprimer.',
    wrongPassword:'Mot de passe incorrect',
    addFav:'Ajouter aux favoris', removeFav:'Retirer des favoris',
    exportPdf:'Exporter en PDF', connect:'Connecter',
     addItem:'Ajouter element', addText:'Ajouter texte', insertImage:'Insérer image', voiceNote:'Note vocale',
    addCover:'Ajouter couverture', removeCover:'Supprimer couverture', coverTooLarge:'Image trop grande. Max 5Mo.',
    bold:'Gras (Ctrl+B)', italic:'Italique (Ctrl+I)', underline:'Souligne (Ctrl+U)', highlight:'Surligner', bulletList:'Liste à puces', numberedList:'Liste numérotée',
    bg:'Fond', postit:'Post-it', cork:'Liege', white:'Blanc', black:'Noir', green:'Vert (tableau)', exportToPdf:'Exporter en PDF', export:'Exporter', studyCards:'Cartes de r\u00E9vision', resetZoom:'R\u00E9initialiser le zoom',
    noteTitlePlaceholder:'Titre de la note', boardNamePlaceholder:'Nom du tableau', leaveEmpty:'Laisser vide si pas de mot de passe',
    passwordProtected:'Protege par mot de passe', noContent:'Pas de contenu',
    noNotes:'Pas encore de notes.', noBoards:'Pas encore de tableaux.', noDiaryEntries:'Aucune entr\u00e9e dans le journal.',
    newNoteLabel:'Nouvelle note', newBoardLabel:'Nouveau tableau',
    addItemsPrompt:'Ajoutez des elements a votre note',
    textPlaceholder:'Ecrivez votre texte ici...', itemPlaceholder:'Ecrivez ici...',
    back:'Retour', selectNote:'Selectionnez ou creez une note',
    selectBoard:'Selectionnez ou creez un tableau',
    exported:'Exporte: ', printError:'Erreur d\'impression', processingExport:'Votre note est en cours de traitement',
    needPostits:'Au moins 2 post-its necessaires',
    clickDestiny:'Cliquez sur le post-it de destination',
    connectionCreated:'Connexion creee', connectionExists:'Cette connexion existe deja',
    chooseOther:'Choisissez un autre post-it',
    diarySection:'Journal', language:'Langue',
    cafecitoDesc:'La Bibliotheque de Babel est infinie. Les ressources pour la developper ne le sont pas. Si MiBabel vous est utile, vous pouvez aider a continuer a la construire.',
    libro:'Un livre', estante:'Une etagere', galeria:'Une galerie', salaBabel:'Une salle de Babel',
    trash:'Corbeille', trashEmpty:'La corbeille est vide.', trashSubtitle:'Les \u00e9l\u00e9ments supprim\u00e9s sont automatiquement effac\u00e9s apr\u00e8s 30 jours.',
    restore:'Restaurer', deletePermanent:'Supprimer', confirmDeletePermanent:'Supprimer d\u00e9finitivement\u00a0?',
    trashDaysLeft:'Supprim\u00e9 dans ', trashDaysUnit:' jour(s)', trashDeletedSoon:'Sera bient\u00f4t supprim\u00e9',
    trashTypeNote:'Note', trashTypeBoard:'Tableau', trashTypeStudySet:'Cartes m\u00e9moire',
    linkHelpTitle:'Liens entre notes & URL', linkToNote:'Lien vers une autre note', linkToUrl:'Lien vers une URL externe',
    diaryPwdLabel:'Mot de passe du journal', diaryPwdSet:'\uD83D\uDD12 Mot de passe d\u00e9fini', diaryPwdChange:'Modifier', diaryPwdRemove:'Supprimer', diaryPwdNone:'Pas de mot de passe', diaryPwdSetBtn:'D\u00e9finir',
    diaryPwdSetTitle:'D\u00e9finir le mot de passe du journal', diaryPwdChangeTitle:'Modifier le mot de passe du journal', diaryPwdRemoveTitle:'Supprimer le mot de passe du journal',
    diaryPwdOldLabel:'Mot de passe actuel', diaryPwdNewLabel:'Nouveau mot de passe',
    diaryPwdAlertEmpty:'Entrez un mot de passe.', diaryPwdAlertWrong:'Mot de passe actuel incorrect.', diaryPwdAlertNewEmpty:'Entrez le nouveau mot de passe.',
    diaryProtected:'Les notes du journal sont prot\u00e9g\u00e9es', diaryForgotPwd:'Mot de passe oubli\u00e9 ?',
    recoveryPrompt:'Entrez votre code de r\u00e9cup\u00e9ration :', recoveryWrong:'Code incorrect.',
    recoveryDialogTitle:'Code de r\u00e9cup\u00e9ration', recoveryDialogMsg:'Conservez ce code en lieu s\u00fbr. Si vous oubliez votre mot de passe, vous pourrez l\u2019utiliser pour r\u00e9cup\u00e9rer l\u2019acc\u00e8s \u00e0 vos notes du journal.', recoveryDialogBtn:'Je l\u2019ai sauvegard\u00e9',
    migrateLabel:'Migrer les donn\u00e9es', exportBtn:'Exporter les donn\u00e9es', importBtn:'Importer les donn\u00e9es',
    save:'Enregistrer', preview:'Aper\u00e7u:', insert:'Ins\u00e9rer', newSetTitle:'Nouvel ensemble',
    insertTable:'Tableau', mergeCells:'Fusionner', splitCell:'Diviser', alignLeft:'Gauche', alignCenter:'Centre', alignRight:'Droite', alignJustify:'Justifier', tableRows:'Lignes', tableCols:'Colonnes', createTable:'Cr\u00e9er',
    months:['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'],
    dayAbbr:['Di','Lu','Ma','Me','Je','Ve','Sa'],
    searchDate:'Rechercher une date (jj/mm/aaaa)',
    checkDownloads:'Consultez votre dossier Téléchargements',
    welcomeTitle:'Bienvenue sur MiBabel',
    welcomeMsg:'Je vous souhaite la bienvenue dans MiBabel, un projet ind\u00e9pendant cr\u00e9\u00e9 par moi, un \u00e9tudiant passionn\u00e9 par le savoir.<br><br>MiBabel est n\u00e9 principalement pour les \u00e9tudiants. Gr\u00e2ce \u00e0 sa simplicit\u00e9 et \u00e0 ses divers outils, il cherche \u00e0 devenir un compagnon d\u2019\u00e9tude et d\u2019organisation. Cependant, il est ouvert \u00e0 toute personne souhaitant organiser ses id\u00e9es, projets et apprentissages.<br><br>Son nom est inspir\u00e9 de \u00ab\u00a0La Biblioth\u00e8que de Babel\u00a0\u00bb, la c\u00e9l\u00e8bre nouvelle de l\u2019\u00e9crivain et po\u00e8te argentin Jorge Luis Borges, qui imagine une biblioth\u00e8que infinie capable de contenir tous les livres possibles.<br><br><i>\u00ab\u00a0La Biblioth\u00e8que est une sph\u00e8re dont le centre exact est un hexagone quelconque, et dont la circonf\u00e9rence est inaccessible.\u00a0\u00bb</i><br><br>Extrait de \u00ab\u00a0La Biblioth\u00e8que de Babel\u00a0\u00bb, de Jorge Luis Borges.<br><br>MiBabel est une application gratuite, priv\u00e9e et con\u00e7ue pour \u00eatre utile. Si elle vous est pr\u00e9cieuse, vous pouvez contribuer \u00e0 son d\u00e9veloppement et aider cette biblioth\u00e8que \u00e0 continuer de grandir.',
    milestoneMsg:'Si MiBabel vous est utile, je vous invite \u00e0 contribuer pour que cette biblioth\u00e8que continue de grandir.',
    milestoneBtn:'Pas maintenant',
     event:'Événement', task:'Tâche', remindMe:'Me rappeler',
    everyWeek:'Chaque semaine', everyMonth:'Chaque mois', everyYear:'Chaque année', everyDay:'Tous les jours',
    noRepeat:'Sans répétition', pending:'En attente', completed:'Terminée', type:'Type', repeat:'Répétition',
    insertEquation:'Insérer équation', equationEditor:'Éditeur équation',
    equationError:'L\'équation contient des erreurs', editEquation:'Modifier équation',
    latexPreview:'Aperçu', boardInsertEquation:'Insérer équation', equationPlaceholder:'Écrivez LaTeX ici...',
      stats:'Statistiques', about:'À propos', totalNotes:'Total notes', totalBoards:'Total tableaux',
      totalStudySets:'Total ensembles', totalPostits:'Total post-its', totalReminders:'Total rappels',
      totalWords:'Total mots', versionLabel:'Version', licenses:'Licences', changelog:'Journal des modifications',
      developer:'Développeur', contact:'Contact', privacy:'Confidentialité', boardNoShadows:'Masquer ombres', reduceMotion:'Réduire animations',
      weekStartsMonday:'Semaine commence lundi', defaultBoardBg:'Fond tableau par défaut',
      boardBgLabel:'Fond du tableau', boardShadowsLabel:'Afficher ombres post-its',
      boardAnimationsLabel:'Afficher animations', showStats:'Statistiques', showAbout:'À propos',
      monday:'Lundi', sunday:'Dimanche',
      import:'Importer', importSuccess:'\u00c9l\u00e9ment import\u00e9 avec succ\u00e8s',
      invalidFile:'Fichier invalide ou corrompu',
      uuidConflict:'Un \u00e9l\u00e9ment avec cet ID existe d\u00e9j\u00e0. Un nouvel ID sera g\u00e9n\u00e9r\u00e9.',
      exportNote:'Exporter comme note', exportBoard:'Exporter comme tableau', exportStudySet:'Exporter comme jeu de cartes'
    },
  pt: {
    notes:'Notas', diary:'Diario', board:'Quadro', boards:'Quadros', studyCards:'Cartoes de estudo', settings:'Configuracoes', rename:'Renomear',
    newSet:'Novo conjunto', editSet:'Editar conjunto', deleteSet:'Excluir conjunto', addCard:'Adicionar cartao',
    front:'Frente', back:'Verso', know:'Sabia', dontKnow:'Nao sabia',
    noCards:'Nenhum cartao ainda', study:'Estudar', edit:'Editar', del:'Excluir',
    setName:'Nome do conjunto', enterSetName:'Digite o nome', cardList:'Cartoes', backToSets:'Voltar', showAnswer:'Clique para ver',
    darkTheme:'Tema escuro', lightTheme:'Tema claro',
    cancel:'Cancelar', create:'Criar', confirm:'Confirmar', close:'Fechar', understood:'Entendi',
    newNote:'Nova Nota', newBoard:'Novo Quadro', title:'Titulo', name:'Nome',
    passwordOptional:'Senha (opcional)', enterPassword:'Digite a senha',
    protectedNote:'Nota protegida: ', protectedBoard:'Quadro protegido: ',
    deleteNote:'Excluir nota: ', deleteBoard:'Excluir quadro: ',
    noteInFavorites:'Nota nos favoritos',
    unfavoriteToDelete:'Remova dos favoritos antes de excluir.',
    wrongPassword:'Senha incorreta',
    addFav:'Adicionar aos favoritos', removeFav:'Remover dos favoritos',
    exportPdf:'Exportar PDF', connect:'Conectar',
     addItem:'Adicionar item', addText:'Adicionar texto', insertImage:'Inserir imagem',
    addCover:'Adicionar capa', removeCover:'Remover capa', coverTooLarge:'Imagem muito grande. Max 5MB.',
    bold:'Negrito (Ctrl+B)', italic:'Italico (Ctrl+I)', underline:'Sublinhado (Ctrl+U)', highlight:'Destacar', bulletList:'Lista com marcadores', numberedList:'Lista numerada',
    bg:'Fundo', postit:'Post-it', cork:'Cortica', white:'Branco', black:'Preto', green:'Verde (quadro)', exportToPdf:'Exportar PDF', export:'Exportar', studyCards:'Cart\u00F5es de estudo', resetZoom:'Redefinir zoom',
    noteTitlePlaceholder:'Titulo da nota', boardNamePlaceholder:'Nome do quadro', leaveEmpty:'Deixe vazio se nao tiver senha',
    passwordProtected:'Protegido por senha', noContent:'Sem conteudo',
    noNotes:'Ainda nao ha notas.', noBoards:'Ainda nao ha quadros.', noDiaryEntries:'Nenhuma entrada no di\u00e1rio.',
    newNoteLabel:'Nova nota', newBoardLabel:'Novo quadro',
    addItemsPrompt:'Adicione itens a sua nota',
    textPlaceholder:'Escreva seu texto aqui...', itemPlaceholder:'Escreva aqui...',
    back:'Voltar', selectNote:'Selecione ou crie uma nota',
    selectBoard:'Selecione ou crie um quadro',
    exported:'Exportado: ', printError:'Erro ao imprimir', processingExport:'Sua nota est\u00e1 sendo processada',
    needPostits:'Pelo menos 2 post-its necessarios',
    clickDestiny:'Clique no post-it de destino',
    connectionCreated:'Conexao criada', connectionExists:'Essa conexao ja existe',
    chooseOther:'Escolha outro post-it',
    diarySection:'Diario', language:'Idioma',
    cafecitoDesc:'A Biblioteca de Babel e infinita. Os recursos para desenvolve-la nao. Se o MiBabel e util para voce, pode ajudar a continuar construindo.',
    libro:'Um livro', estante:'Uma estante', galeria:'Uma galeria', salaBabel:'Uma sala de Babel',
    trash:'Lixeira', trashEmpty:'A lixeira est\u00e1 vazia.', trashSubtitle:'Os itens exclu\u00eddos s\u00e3o removidos automaticamente ap\u00f3s 30 dias.',
    restore:'Restaurar', deletePermanent:'Excluir', confirmDeletePermanent:'Excluir permanentemente?',
    trashDaysLeft:'Exclu\u00eddo em ', trashDaysUnit:' dia(s)', trashDeletedSoon:'Ser\u00e1 exclu\u00eddo em breve',
    trashTypeNote:'Nota', trashTypeBoard:'Quadro', trashTypeStudySet:'Cart\u00f5es de estudo',
    linkHelpTitle:'Links entre notas e URLs', linkToNote:'Vincula a outra nota', linkToUrl:'Vincula a uma URL externa',
    diaryPwdLabel:'Senha do di\u00e1rio', diaryPwdSet:'\uD83D\uDD12 Senha definida', diaryPwdChange:'Alterar', diaryPwdRemove:'Remover', diaryPwdNone:'Sem senha', diaryPwdSetBtn:'Definir',
    diaryPwdSetTitle:'Definir senha do di\u00e1rio', diaryPwdChangeTitle:'Alterar senha do di\u00e1rio', diaryPwdRemoveTitle:'Remover senha do di\u00e1rio',
    diaryPwdOldLabel:'Senha atual', diaryPwdNewLabel:'Nova senha',
    diaryPwdAlertEmpty:'Digite uma senha.', diaryPwdAlertWrong:'Senha atual incorreta.', diaryPwdAlertNewEmpty:'Digite a nova senha.',
    diaryProtected:'Notas do di\u00e1rio protegidas', diaryForgotPwd:'Esqueceu a senha?',
    recoveryPrompt:'Digite seu c\u00f3digo de recupera\u00e7\u00e3o:', recoveryWrong:'C\u00f3digo incorreto.',
    recoveryDialogTitle:'C\u00f3digo de recupera\u00e7\u00e3o', recoveryDialogMsg:'Guarde este c\u00f3digo em um lugar seguro. Se voc\u00ea esquecer sua senha, poder\u00e1 us\u00e1-lo para recuperar o acesso \u00e0s suas notas do di\u00e1rio.', recoveryDialogBtn:'J\u00e1 salvei',
    migrateLabel:'Migrar dados', exportBtn:'Exportar dados', importBtn:'Importar dados',
    save:'Salvar', preview:'Visualizar:', insert:'Inserir', newSetTitle:'Novo conjunto',
    insertTable:'Tabela', mergeCells:'Mesclar', splitCell:'Dividir', alignLeft:'Esquerda', alignCenter:'Centro', alignRight:'Direita', alignJustify:'Justificar', tableRows:'Linhas', tableCols:'Colunas', createTable:'Criar',
    months:['Janeiro','Fevereiro','Marco','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    dayAbbr:['Do','Se','Te','Qu','Qu','Se','Sa'],
    searchDate:'Buscar data (dd/mm/aaaa)',
    checkDownloads:'Verifique a pasta de Downloads',
    welcomeTitle:'Bem-vindo ao MiBabel',
    welcomeMsg:'Dou-lhe as boas-vindas ao MiBabel, um projeto independente criado por mim, um estudante apaixonado pelo conhecimento.<br><br>O MiBabel nasceu principalmente pensando nos estudantes. Gra\u00e7as \u00e0 sua simplicidade e suas diversas ferramentas, busca tornar-se um companheiro de estudo e organiza\u00e7\u00e3o. No entanto, est\u00e1 aberto a qualquer pessoa que deseje organizar suas ideias, projetos e aprendizados.<br><br>Seu nome \u00e9 inspirado em \u00abA Biblioteca de Babel\u00bb, o famoso conto do escritor e poeta argentino Jorge Luis Borges, que imagina uma biblioteca infinita capaz de conter todos os livros poss\u00edveis.<br><br><i>\u00abA Biblioteca \u00e9 uma esfera cujo centro exato \u00e9 qualquer hex\u00e1gono, cuja circunfer\u00eancia \u00e9 inacess\u00edvel.\u00bb</i><br><br>Fragmento de \u00abA Biblioteca de Babel\u00bb, de Jorge Luis Borges.<br><br>O MiBabel \u00e9 um aplicativo gratuito, privado e projetado para ser \u00fatil. Se voc\u00ea o achar valioso, pode contribuir para seu desenvolvimento e ajudar esta biblioteca a continuar crescendo.',
    milestoneMsg:'Se o MiBabel est\u00e1 sendo \u00fatil para voc\u00ea, convido-o a contribuir para que esta biblioteca continue crescendo.',
    milestoneBtn:'Agora n\u00e3o',
    insertEquation:'Inserir equa\u00e7\u00e3o', equationEditor:'Editor de equa\u00e7\u00e3o',
    equationError:'A equa\u00e7\u00e3o cont\u00e9m erros', editEquation:'Editar equa\u00e7\u00e3o',
    latexPreview:'Visualiza\u00e7\u00e3o', boardInsertEquation:'Inserir equa\u00e7\u00e3o', equationPlaceholder:'Escreva LaTeX aqui...',
      stats:'Estat\u00edsticas', about:'Sobre', totalNotes:'Total de notas', totalBoards:'Total de quadros',
      totalStudySets:'Total de conjuntos', totalPostits:'Total de post-its', totalReminders:'Total de lembretes',
      totalWords:'Total de palavras', versionLabel:'Vers\u00e3o', licenses:'Licen\u00e7as', changelog:'Registro de altera\u00e7\u00f5es',
      developer:'Desenvolvedor', contact:'Contato', privacy:'Privacidade', boardNoShadows:'Ocultar sombras', reduceMotion:'Reduzir movimento',
      weekStartsMonday:'Semana come\u00e7a na segunda', defaultBoardBg:'Fundo padr\u00e3o do quadro',
      boardBgLabel:'Fundo do quadro', boardShadowsLabel:'Mostrar sombras em post-its',
      boardAnimationsLabel:'Mostrar anima\u00e7\u00f5es', showStats:'Estat\u00edsticas', showAbout:'Sobre',
      monday:'Segunda-feira', sunday:'Domingo',
      import:'Importar', importSuccess:'Elemento importado com sucesso',
      invalidFile:'Arquivo inv\u00e1lido ou corrompido',
      uuidConflict:'J\u00e1 existe um elemento com este ID. Um novo ID ser\u00e1 gerado.',
      exportNote:'Exportar como nota', exportBoard:'Exportar como quadro', exportStudySet:'Exportar como conjunto'
    },
  ru: {
    notes:'Заметки', diary:'Дневник', board:'Доска', boards:'Доски', studyCards:'Учебные карточки', settings:'Настройки', rename:'Переименовать',
    newSet:'Новый набор', editSet:'Редактировать', deleteSet:'Удалить', addCard:'Добавить карточку',
    front:'Лицевая', back:'Обратная', know:'Знаю', dontKnow:'Не знаю',
    noCards:'Нет карточек', study:'Учить', edit:'Правка', del:'Удалить',
    setName:'Название', enterSetName:'Введите название', cardList:'Карточки', backToSets:'Назад', showAnswer:'Нажмите чтобы открыть',
    darkTheme:'Темная тема', lightTheme:'Светлая тема',
    cancel:'Отмена', create:'Создать', confirm:'Подтвердить', close:'Закрыть', understood:'Понятно',
    newNote:'Новая заметка', newBoard:'Новая доска', title:'Заголовок', name:'Имя',
    passwordOptional:'Пароль (необязательно)', enterPassword:'Введите пароль',
    protectedNote:'Защищенная заметка: ', protectedBoard:'Защищенная доска: ',
    deleteNote:'Удалить заметку: ', deleteBoard:'Удалить доску: ',
    noteInFavorites:'Заметка в избранном',
    unfavoriteToDelete:'Удалите из избранного перед удалением.',
    wrongPassword:'Неверный пароль',
    addFav:'Добавить в избранное', removeFav:'Убрать из избранного',
    exportPdf:'Экспорт PDF', connect:'Соединить',
     addItem:'Добавить пункт', addText:'Добавить текст', insertImage:'Вставить изображение', voiceNote:'Голосовая заметка',
    addCover:'Добавить обложку', removeCover:'Удалить обложку', coverTooLarge:'Изображение слишком большое. Макс 5МБ.',
    bold:'Жирный (Ctrl+B)', italic:'Курсив (Ctrl+I)', underline:'Подчеркнутый (Ctrl+U)', highlight:'Выделить', bulletList:'Маркированный список', numberedList:'Нумерованный список',
    bg:'Фон', postit:'Стикер', cork:'Пробка', white:'Белый', black:'Черный', green:'Зеленый (доска)', exportToPdf:'Экспорт PDF', export:'Экспорт', studyCards:'Карточки для изучения',
    noteTitlePlaceholder:'Заголовок заметки', boardNamePlaceholder:'Имя доски', leaveEmpty:'Оставьте пустым если нет пароля',
    passwordProtected:'Защищено паролем', noContent:'Нет содержимого',
    noNotes:'Еще нет заметок.', noBoards:'Еще нет досок.', noDiaryEntries:'Нет записей в дневнике.',
    newNoteLabel:'Новая заметка', newBoardLabel:'Новая доска',
    addItemsPrompt:'Добавьте пункты в заметку',
    textPlaceholder:'Напишите текст здесь...', itemPlaceholder:'Напишите здесь...',
    back:'Назад', selectNote:'Выберите или создайте заметку',
    selectBoard:'Выберите или создайте доску',
    exported:'\u042d\u043a\u0441\u043f\u043e\u0440\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043e: ', printError:'\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0435\u0447\u0430\u0442\u0438', processingExport:'\u0412\u0430\u0448\u0430 \u0437\u0430\u043c\u0435\u0442\u043a\u0430 \u043e\u0431\u0440\u0430\u0431\u0430\u0442\u044b\u0432\u0430\u0435\u0442\u0441\u044f',
    needPostits:'Нужно как минимум 2 стикера',
    clickDestiny:'Нажмите на целевой стикер',
    connectionCreated:'Соединение создано', connectionExists:'Такое соединение уже существует',
    chooseOther:'Выберите другой стикер',
    diarySection:'Дневник', language:'Язык',
    cafecitoDesc:'Вавилонская библиотека бесконечна. Ресурсы для ее развития - нет. Если MiBabel вам полезен, вы можете помочь продолжать ее строить.',
    libro:'Книга', estante:'Стеллаж', galeria:'Галерея', salaBabel:'Зал Вавилона',
    trash:'Корзина', trashEmpty:'Корзина пуста.', trashSubtitle:'Удаленные элементы автоматически удаляются через 30 дней.',
    restore:'Восстановить', deletePermanent:'Удалить', confirmDeletePermanent:'Удалить навсегда?',
    trashDaysLeft:'Удалится через ', trashDaysUnit:' дн.', trashDeletedSoon:'Скоро удалится',
    trashTypeNote:'Заметка', trashTypeBoard:'Доска', trashTypeStudySet:'Карточки',
    linkHelpTitle:'Ссылки между заметками и URL', linkToNote:'Ссылка на другую заметку', linkToUrl:'Ссылка на внешний URL',
    diaryPwdLabel:'Пароль дневника', diaryPwdSet:'\uD83D\uDD12 Пароль установлен', diaryPwdChange:'Изменить', diaryPwdRemove:'Удалить', diaryPwdNone:'Нет пароля', diaryPwdSetBtn:'Установить',
    diaryPwdSetTitle:'Установить пароль дневника', diaryPwdChangeTitle:'Изменить пароль дневника', diaryPwdRemoveTitle:'Удалить пароль дневника',
    diaryPwdOldLabel:'Текущий пароль', diaryPwdNewLabel:'Новый пароль',
    diaryPwdAlertEmpty:'Введите пароль.', diaryPwdAlertWrong:'Неверный текущий пароль.', diaryPwdAlertNewEmpty:'Введите новый пароль.',
    diaryProtected:'Заметки дневника защищены', diaryForgotPwd:'Забыли пароль?',
    recoveryPrompt:'Введите код восстановления:', recoveryWrong:'Неверный код.',
    recoveryDialogTitle:'Код восстановления', recoveryDialogMsg:'Сохраните этот код в надежном месте. Если вы забудете пароль, вы сможете использовать его для восстановления доступа к заметкам дневника.', recoveryDialogBtn:'Я сохранил',
    migrateLabel:'Миграция данных', exportBtn:'Экспорт данных', importBtn:'Импорт данных',
    save:'Сохранить', preview:'Предпросмотр:', insert:'Вставить', newSetTitle:'Новый набор',
    insertTable:'Таблица', mergeCells:'Объединить', splitCell:'Разделить', alignLeft:'Слева', alignCenter:'По центру', alignRight:'Справа', alignJustify:'По ширине', tableRows:'Строки', tableCols:'Столбцы', createTable:'Создать',
    months:['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    dayAbbr:['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
    searchDate:'Поиск даты (дд/мм/гггг)',
    checkDownloads:'Проверьте папку Загрузки',
    welcomeTitle:'Добро пожаловать в MiBabel',
    welcomeMsg:'Я приветствую вас в MiBabel, независимом проекте, созданном мной, студентом, увлеченным знаниями.<br><br>MiBabel был создан в первую очередь для студентов. Благодаря своей простоте и разнообразным инструментам, он стремится стать спутником в учебе и организации. Однако он открыт для любого, кто хочет упорядочить свои идеи, проекты и знания.<br><br>Его название вдохновлено \u00ab\u0412\u0430\u0432\u0438\u043b\u043e\u043d\u0441\u043a\u043e\u0439 \u0431\u0438\u0431\u043b\u0438\u043e\u0442\u0435\u043a\u043e\u0439\u00bb, знаменитым рассказом аргентинского писателя и поэта Хорхе Луиса Борхеса, который представляет бесконечную библиотеку, способную вместить все возможные книги.<br><br><i>\u00ab\u0411\u0438\u0431\u043b\u0438\u043e\u0442\u0435\u043a\u0430 \u2014 \u044d\u0442\u043e \u0441\u0444\u0435\u0440\u0430, \u0442\u043e\u0447\u043d\u044b\u0439 \u0446\u0435\u043d\u0442\u0440 \u043a\u043e\u0442\u043e\u0440\u043e\u0439 \u2014 \u043b\u044e\u0431\u043e\u0439 \u0448\u0435\u0441\u0442\u0438\u0443\u0433\u043e\u043b\u044c\u043d\u0438\u043a, \u0430 \u043e\u043a\u0440\u0443\u0436\u043d\u043e\u0441\u0442\u044c \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u043d\u0430.\u00bb</i><br><br>\u041e\u0442\u0440\u044b\u0432\u043e\u043a \u0438\u0437 \u00ab\u0412\u0430\u0432\u0438\u043b\u043e\u043d\u0441\u043a\u043e\u0439 \u0431\u0438\u0431\u043b\u0438\u043e\u0442\u0435\u043a\u0438\u00bb, \u0425\u043e\u0440\u0445\u0435 \u041b\u0443\u0438\u0441 \u0411\u043e\u0440\u0445\u0435\u0441.<br><br>MiBabel \u2014 \u044d\u0442\u043e \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u043e\u0435, \u043f\u0440\u0438\u0432\u0430\u0442\u043d\u043e\u0435 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435, \u0441\u043e\u0437\u0434\u0430\u043d\u043d\u043e\u0435 \u0447\u0442\u043e\u0431\u044b \u0431\u044b\u0442\u044c \u043f\u043e\u043b\u0435\u0437\u043d\u044b\u043c. \u0415\u0441\u043b\u0438 \u0432\u044b \u043d\u0430\u0445\u043e\u0434\u0438\u0442\u0435 \u0435\u0433\u043e \u0446\u0435\u043d\u043d\u044b\u043c, \u0432\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u043f\u043e\u043c\u043e\u0447\u044c \u0435\u0433\u043e \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u044e \u0438 \u043f\u043e\u043c\u043e\u0447\u044c \u044d\u0442\u043e\u0439 \u0431\u0438\u0431\u043b\u0438\u043e\u0442\u0435\u043a\u0435 \u043f\u0440\u043e\u0434\u043e\u043b\u0436\u0430\u0442\u044c \u0440\u0430\u0441\u0442\u0438.',
    milestoneMsg:'\u0415\u0441\u043b\u0438 MiBabel \u0432\u0430\u043c \u043f\u043e\u043b\u0435\u0437\u0435\u043d, \u044f \u043f\u0440\u0438\u0433\u043b\u0430\u0448\u0430\u044e \u0432\u0430\u0441 \u0432\u043d\u0435\u0441\u0442\u0438 \u0432\u043a\u043b\u0430\u0434, \u0447\u0442\u043e\u0431\u044b \u044d\u0442\u0430 \u0431\u0438\u0431\u043b\u0438\u043e\u0442\u0435\u043a\u0430 \u043f\u0440\u043e\u0434\u043e\u043b\u0436\u0430\u043b\u0430 \u0440\u0430\u0441\u0442\u0438.',
    milestoneBtn:'\u041d\u0435 \u0441\u0435\u0439\u0447\u0430\u0441',
     event:'Событие', task:'Задача', remindMe:'Напомнить',
    everyWeek:'Каждую неделю', everyMonth:'Каждый месяц', everyYear:'Каждый год', everyDay:'Каждый день',
    noRepeat:'Без повторения', pending:'Ожидает', completed:'Завершено', type:'Тип', repeat:'Повторение',
    insertEquation:'Вставить уравнение', equationEditor:'Редактор уравнений',
    equationError:'Уравнение содержит ошибки', editEquation:'Редактировать уравнение',
    latexPreview:'Предпросмотр', boardInsertEquation:'Вставить уравнение', equationPlaceholder:'Напишите LaTeX здесь...',
      stats:'Статистика', about:'О приложении', totalNotes:'Всего заметок', totalBoards:'Всего досок',
      totalStudySets:'Всего наборов', totalPostits:'Всего стикеров', totalReminders:'Всего напоминаний',
      totalWords:'Всего слов', versionLabel:'Версия', licenses:'Лицензии', changelog:'История изменений',
      developer:'Разработчик', contact:'Контакт', privacy:'Конфиденциальность', boardNoShadows:'Скрыть тени', reduceMotion:'Уменьшить анимацию',
      weekStartsMonday:'Неделя начинается с понедельника', defaultBoardBg:'Фон доски по умолчанию',
      boardBgLabel:'Фон доски', boardShadowsLabel:'Показывать тени стикеров',
      boardAnimationsLabel:'Показывать анимацию', showStats:'Статистика', showAbout:'О приложении',
      monday:'Понедельник', sunday:'Воскресенье',
      import:'Импорт', importSuccess:'Элемент успешно импортирован',
      invalidFile:'Неверный или поврежденный файл',
      uuidConflict:'Элемент с таким ID уже существует. Будет сгенерирован новый ID.',
      exportNote:'Экспорт как заметку', exportBoard:'Экспорт как доску', exportStudySet:'Экспорт как набор карточек'
    },
  de: {
    notes:'Notizen', diary:'Tagebuch', board:'Pinnwand', boards:'Pinnw\u00e4nde', studyCards:'Lernkarten', settings:'Einstellungen', rename:'Umbenennen',
    newSet:'Neues Set', editSet:'Set bearbeiten', deleteSet:'Set l\u00f6schen', addCard:'Karte hinzuf\u00fcgen',
    front:'Vorderseite', back:'R\u00fcckseite', know:'Gewusst', dontKnow:'Nicht gewusst',
    noCards:'Noch keine Karten', study:'Lernen', edit:'Bearbeiten', del:'L\u00f6schen',
    setName:'Name des Sets', enterSetName:'Name des Sets eingeben', cardList:'Karten', backToSets:'Zur\u00fcck zu Sets', showAnswer:'Klicken zum Anzeigen',
    darkTheme:'Dunkles Design', lightTheme:'Helles Design',
    cancel:'Abbrechen', create:'Erstellen', confirm:'Best\u00e4tigen', close:'Schlie\u00dfen', understood:'Verstanden',
    newNote:'Neue Notiz', newBoard:'Neue Pinnwand', title:'Titel', name:'Name',
    passwordOptional:'Passwort (optional)', enterPassword:'Passwort eingeben',
    protectedNote:'Gesch\u00fctzte Notiz: ', protectedBoard:'Gesch\u00fctzte Pinnwand: ',
    deleteNote:'Notiz l\u00f6schen: ', deleteBoard:'Pinnwand l\u00f6schen: ',
    noteInFavorites:'Notiz in Favoriten',
    unfavoriteToDelete:'Vor dem L\u00f6schen aus Favoriten entfernen.',
    wrongPassword:'Falsches Passwort',
    addFav:'Zu Favoriten hinzuf\u00fcgen', removeFav:'Aus Favoriten entfernen',
    exportPdf:'Als PDF exportieren', connect:'Verbinden',
     addItem:'Element hinzuf\u00fcgen', addText:'Text hinzuf\u00fcgen', insertImage:'Bild einf\u00fcgen', voiceNote:'Sprachnotiz',
    addCover:'Cover hinzuf\u00fcgen', removeCover:'Cover entfernen', coverTooLarge:'Bild zu gro\u00df. Max. 5 MB.',
    bold:'Fett (Ctrl+B)', italic:'Kursiv (Ctrl+I)', underline:'Unterstrichen (Ctrl+U)', highlight:'Hervorheben', bulletList:'Aufz\u00e4hlungsliste', numberedList:'Nummerierte Liste',
    bg:'Hintergrund', postit:'Haftnotiz', cork:'Kork', white:'Wei\u00df', black:'Schwarz', green:'Gr\u00fcn (Pinnwand)', exportToPdf:'Als PDF exportieren', export:'Exportieren', studyCards:'Lernkarten',
    noteTitlePlaceholder:'Titel der Notiz', boardNamePlaceholder:'Name der Pinnwand', leaveEmpty:'Bei keinem Passwort leer lassen',
    passwordProtected:'Passwortgesch\u00fctzt', noContent:'Kein Inhalt',
    noNotes:'Noch keine Notizen.', noBoards:'Noch keine Pinnw\u00e4nde.', noDiaryEntries:'Keine Tagebucheintr\u00e4ge.',
    newNoteLabel:'Neue Notiz', newBoardLabel:'Neue Pinnwand',
    addItemsPrompt:'F\u00fcge deiner Notiz Elemente hinzu',
    textPlaceholder:'Schreibe deinen Text hier...', itemPlaceholder:'Schreibe hier...',
    back:'Zur\u00fcck', selectNote:'W\u00e4hle oder erstelle eine Notiz', selectBoard:'W\u00e4hle oder erstelle eine Pinnwand',
    exported:'Exportiert: ', printError:'Fehler beim Drucken', processingExport:'Ihre Notiz wird verarbeitet',
    needPostits:'Mindestens 2 Haftnotizen erforderlich',
    clickDestiny:'Klicke auf die Ziel-Haftnotiz',
    connectionCreated:'Verbindung erstellt', connectionExists:'Verbindung existiert bereits',
    chooseOther:'W\u00e4hle eine andere Haftnotiz',
    diarySection:'Tagebuch', language:'Sprache',
    cafecitoDesc:'Die Bibliothek von Babel ist unendlich. Die Ressourcen, sie zu entwickeln, sind es nicht. Wenn MiBabel f\u00fcr dich n\u00fctzlich ist, kannst du helfen, sie weiter aufzubauen.',
    libro:'Ein Buch', estante:'Ein Regal', galeria:'Eine Galerie', salaBabel:'Ein Babel-Saal',
    trash:'Papierkorb', trashEmpty:'Der Papierkorb ist leer.', trashSubtitle:'Gel\u00f6schte Elemente werden nach 30 Tagen automatisch entfernt.',
    restore:'Wiederherstellen', deletePermanent:'Endg\u00fcltig l\u00f6schen', confirmDeletePermanent:'Endg\u00fcltig l\u00f6schen?',
    trashDaysLeft:'Gel\u00f6scht in ', trashDaysUnit:' Tag(en)', trashDeletedSoon:'Wird bald gel\u00f6scht',
    trashTypeNote:'Notiz', trashTypeBoard:'Pinnwand', trashTypeStudySet:'Lernkarten',
    linkHelpTitle:'Links zwischen Notizen & URLs', linkToNote:'Verlinkt zu einer anderen Notiz', linkToUrl:'Verlinkt zu einer externen URL',
    diaryPwdLabel:'Tagebuch-Passwort', diaryPwdSet:'\uD83D\uDD12 Passwort festgelegt', diaryPwdChange:'\u00c4ndern', diaryPwdRemove:'Entfernen', diaryPwdNone:'Kein Passwort', diaryPwdSetBtn:'Festlegen',
    diaryPwdSetTitle:'Tagebuch-Passwort festlegen', diaryPwdChangeTitle:'Tagebuch-Passwort \u00e4ndern', diaryPwdRemoveTitle:'Tagebuch-Passwort entfernen',
    diaryPwdOldLabel:'Aktuelles Passwort', diaryPwdNewLabel:'Neues Passwort',
    diaryPwdAlertEmpty:'Gib ein Passwort ein.', diaryPwdAlertWrong:'Aktuelles Passwort ist falsch.', diaryPwdAlertNewEmpty:'Gib das neue Passwort ein.',
    diaryProtected:'Tagebuch-Notizen sind gesch\u00fctzt', diaryForgotPwd:'Passwort vergessen?',
    recoveryPrompt:'Gib deinen Wiederherstellungscode ein:', recoveryWrong:'Falscher Code.',
    recoveryDialogTitle:'Wiederherstellungscode', recoveryDialogMsg:'Bewahre diesen Code an einem sicheren Ort auf. Wenn du dein Passwort vergisst, kannst du ihn verwenden, um den Zugriff auf deine Tagebuch-Notizen wiederherzustellen.', recoveryDialogBtn:'Ich habe ihn gespeichert',
    migrateLabel:'Daten migrieren', exportBtn:'Daten exportieren', importBtn:'Daten importieren',
    save:'Speichern', preview:'Vorschau:', insert:'Einf\u00fcgen', newSetTitle:'Neues Set',
    insertTable:'Tabelle', mergeCells:'Zusammenf\u00fchren', splitCell:'Teilen', alignLeft:'Links', alignCenter:'Zentriert', alignRight:'Rechts', alignJustify:'Blocksatz', tableRows:'Zeilen', tableCols:'Spalten', createTable:'Erstellen',
    months:['Januar','Februar','M\u00e4rz','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
    dayAbbr:['So','Mo','Di','Mi','Do','Fr','Sa'],
    searchDate:'Datum suchen (tt/mm/jjjj)',
    checkDownloads:'Prüfen Sie den Download-Ordner',
    welcomeTitle:'Willkommen bei MiBabel',
    welcomeMsg:'Willkommen bei MiBabel, einem unabh\u00e4ngigen Projekt, das von mir, einem leidenschaftlichen Studenten, erstellt wurde.<br><br>MiBabel wurde haupts\u00e4chlich f\u00fcr Studenten entwickelt. Dank seiner Einfachheit und seiner vielf\u00e4ltigen Werkzeuge m\u00f6chte es zu einem Begleiter f\u00fcr Studium und Organisation werden. Es steht jedoch jedem offen, der seine Ideen, Projekte und Lerninhalte ordnen m\u00f6chte.<br><br>Sein Name ist inspiriert von \u00abDie Bibliothek von Babel\u00bb, der ber\u00fchmten Erz\u00e4hlung des argentinischen Schriftstellers und Dichters Jorge Luis Borges, die eine unendliche Bibliothek vorstellt, die alle m\u00f6glichen B\u00fccher enthalten kann.<br><br><i>\u00abDie Bibliothek ist eine Kugel, deren genaues Zentrum ein beliebiges Sechseck ist, deren Umfang unzug\u00e4nglich ist.\u00bb</i><br><br>Auszug aus \u00abDie Bibliothek von Babel\u00bb von Jorge Luis Borges.<br><br>MiBabel ist eine kostenlose, private Anwendung, die n\u00fctzlich sein soll. Wenn du sie wertvoll findest, kannst du zu ihrer Entwicklung beitragen und helfen, dass diese Bibliothek weiter w\u00e4chst.',
    milestoneMsg:'Wenn dir MiBabel n\u00fctzt, lade ich dich ein, einen Beitrag zu leisten, damit diese Bibliothek weiter wachsen kann.',
    milestoneBtn:'Nicht jetzt',
     event:'Ereignis', task:'Aufgabe', remindMe:'Erinnern',
    everyWeek:'Jede Woche', everyMonth:'Jeden Monat', everyYear:'Jedes Jahr', everyDay:'Jeden Tag',
    noRepeat:'Keine Wiederholung', pending:'Ausstehend', completed:'Abgeschlossen', type:'Typ', repeat:'Wiederholung',
    insertEquation:'Gleichung einf\u00fcgen', equationEditor:'Gleichungseditor',
    equationError:'Gleichung enth\u00e4lt Fehler', editEquation:'Gleichung bearbeiten',
    latexPreview:'Vorschau', boardInsertEquation:'Gleichung einf\u00fcgen', equationPlaceholder:'LaTeX hier schreiben...',
      stats:'Statistiken', about:'\u00dcber', totalNotes:'Notizen insgesamt', totalBoards:'Pinnw\u00e4nde insgesamt',
      totalStudySets:'Lernsets insgesamt', totalPostits:'Post-its insgesamt', totalReminders:'Erinnerungen insgesamt',
      totalWords:'W\u00f6rter insgesamt', versionLabel:'Version', licenses:'Lizenzen', changelog:'\u00c4nderungsprotokoll',
      developer:'Entwickler', contact:'Kontakt', privacy:'Datenschutz', boardNoShadows:'Schatten ausblenden', reduceMotion:'Animationen reduzieren',
      weekStartsMonday:'Woche beginnt am Montag', defaultBoardBg:'Standard-Pinnwand-Hintergrund',
      boardBgLabel:'Pinnwand-Hintergrund', boardShadowsLabel:'Post-it-Schatten anzeigen',
      boardAnimationsLabel:'Animationen anzeigen', showStats:'Statistiken', showAbout:'\u00dcber',
      monday:'Montag', sunday:'Sonntag',
      import:'Importieren', importSuccess:'Element erfolgreich importiert',
      invalidFile:'Ung\u00fcltige oder besch\u00e4digte Datei',
      uuidConflict:'Ein Element mit dieser ID existiert bereits. Eine neue ID wird generiert.',
      exportNote:'Als Notiz exportieren', exportBoard:'Als Pinnwand exportieren', exportStudySet:'Als Kartenset exportieren'
    },
  it: {
    notes:'Note', diary:'Diario', board:'Lavagna', boards:'Lavagne', studyCards:'Carte di studio', settings:'Impostazioni', rename:'Rinomina',
    newSet:'Nuovo set', editSet:'Modifica set', deleteSet:'Elimina set', addCard:'Aggiungi carta',
    front:'Fronte', back:'Retro', know:'So', dontKnow:'Non so',
    noCards:'Nessuna carta', study:'Studia', edit:'Modifica', del:'Elimina',
    setName:'Nome set', enterSetName:'Inserisci nome', cardList:'Carte', backToSets:'Indietro', showAnswer:'Clicca per vedere',
    darkTheme:'Tema scuro', lightTheme:'Tema chiaro',
    cancel:'Annulla', create:'Crea', confirm:'Conferma', close:'Chiudi', understood:'Capito',
    newNote:'Nuova Nota', newBoard:'Nuova Lavagna', title:'Titolo', name:'Nome',
    passwordOptional:'Password (opzionale)', enterPassword:'Inserisci password',
    protectedNote:'Nota protetta: ', protectedBoard:'Lavagna protetta: ',
    deleteNote:'Elimina nota: ', deleteBoard:'Elimina lavagna: ',
    noteInFavorites:'Nota nei preferiti',
    unfavoriteToDelete:'Rimuovila dai preferiti prima di eliminare.',
    wrongPassword:'Password errata',
    addFav:'Aggiungi ai preferiti', removeFav:'Rimuovi dai preferiti',
    exportPdf:'Esporta PDF', connect:'Collega',
     addItem:'Aggiungi elemento', addText:'Aggiungi testo', insertImage:'Inserisci immagine', voiceNote:'Nota vocale',
    addCover:'Aggiungi copertina', removeCover:'Rimuovi copertina', coverTooLarge:'Immagine troppo grande. Max 5MB.',
    bold:'Grassetto (Ctrl+B)', italic:'Corsivo (Ctrl+I)', underline:'Sottolineato (Ctrl+U)', highlight:'Evidenziare', bulletList:'Elenco puntato', numberedList:'Elenco numerato',
    bg:'Sfondo', postit:'Post-it', cork:'Sughero', white:'Bianco', black:'Nero', green:'Verde (lavagna)', exportToPdf:'Esporta PDF', export:'Esporta', studyCards:'Carte di studio',
    noteTitlePlaceholder:'Titolo nota', boardNamePlaceholder:'Nome lavagna', leaveEmpty:'Lascia vuoto se senza password',
    passwordProtected:'Protetta da password', noContent:'Nessun contenuto',
    noNotes:'Ancora nessuna nota.', noBoards:'Ancora nessuna lavagna.', noDiaryEntries:'Nessuna voce nel diario.',
    newNoteLabel:'Nuova nota', newBoardLabel:'Nuova lavagna',
    addItemsPrompt:'Aggiungi elementi alla tua nota',
    textPlaceholder:'Scrivi il testo qui...', itemPlaceholder:'Scrivi qui...',
    back:'Indietro', selectNote:'Seleziona o crea una nota',
    selectBoard:'Seleziona o crea una lavagna',
    exported:'Esportato: ', printError:'Errore di stampa', processingExport:'La tua nota sta venendo elaborata',
    needPostits:'Servono almeno 2 post-it',
    clickDestiny:'Clicca sul post-it di destinazione',
    connectionCreated:'Connessione creata', connectionExists:'Connessione gia esistente',
    chooseOther:'Scegli un altro post-it',
    diarySection:'Diario', language:'Idioma',
    cafecitoDesc:'La Biblioteca di Babele e infinita. Le risorse per svilupparla no. Se MiBabel ti e utile, puoi aiutare a continuare a costruirla.',
    libro:'Un libro', estante:'Una mensola', galeria:'Una galleria', salaBabel:'Una sala di Babele',
    trash:'Cestino', trashEmpty:'Il cestino \u00e8 vuoto.', trashSubtitle:'Gli elementi eliminati vengono automaticamente rimossi dopo 30 giorni.',
    restore:'Ripristina', deletePermanent:'Elimina', confirmDeletePermanent:'Eliminare definitivamente?',
    trashDaysLeft:'Eliminato tra ', trashDaysUnit:' giorno(i)', trashDeletedSoon:'Sar\u00e0 eliminato a breve',
    trashTypeNote:'Nota', trashTypeBoard:'Lavagna', trashTypeStudySet:'Carte di studio',
    linkHelpTitle:'Collegamenti tra note e URL', linkToNote:'Collega a un\'altra nota', linkToUrl:'Collega a un URL esterno',
    diaryPwdLabel:'Password del diario', diaryPwdSet:'\uD83D\uDD12 Password impostata', diaryPwdChange:'Cambia', diaryPwdRemove:'Rimuovi', diaryPwdNone:'Nessuna password', diaryPwdSetBtn:'Imposta',
    diaryPwdSetTitle:'Imposta password del diario', diaryPwdChangeTitle:'Cambia password del diario', diaryPwdRemoveTitle:'Rimuovi password del diario',
    diaryPwdOldLabel:'Password attuale', diaryPwdNewLabel:'Nuova password',
    diaryPwdAlertEmpty:'Inserisci una password.', diaryPwdAlertWrong:'Password attuale errata.', diaryPwdAlertNewEmpty:'Inserisci la nuova password.',
    diaryProtected:'Le note del diario sono protette', diaryForgotPwd:'Password dimenticata?',
    recoveryPrompt:'Inserisci il codice di recupero:', recoveryWrong:'Codice errato.',
    recoveryDialogTitle:'Codice di recupero', recoveryDialogMsg:'Conserva questo codice in un luogo sicuro. Se dimentichi la password, potrai usarlo per recuperare l\'accesso alle tue note del diario.', recoveryDialogBtn:'L\'ho salvato',
    migrateLabel:'Migrare i dati', exportBtn:'Esporta dati', importBtn:'Importa dati',
    save:'Salva', preview:'Anteprima:', insert:'Inserisci', newSetTitle:'Nuovo set',
    insertTable:'Tabella', mergeCells:'Unisci', splitCell:'Dividi', alignLeft:'Sinistra', alignCenter:'Centro', alignRight:'Destra', alignJustify:'Giustifica', tableRows:'Righe', tableCols:'Colonne', createTable:'Crea',
    months:['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
    dayAbbr:['Do','Lu','Ma','Me','Gi','Ve','Sa'],
    searchDate:'Cerca data (gg/mm/aaaa)',
    checkDownloads:'Controlla la cartella Download',
    welcomeTitle:'Benvenuto su MiBabel',
    welcomeMsg:'Ti do il benvenuto a MiBabel, un progetto indipendente creato da me, uno studente appassionato di conoscenza.<br><br>MiBabel \u00e8 nato principalmente pensando agli studenti. Grazie alla sua semplicit\u00e0 e ai suoi vari strumenti, cerca di diventare un compagno di studio e organizzazione. Tuttavia, \u00e8 aperto a chiunque desideri ordinare le proprie idee, progetti e apprendimenti.<br><br>Il suo nome \u00e8 ispirato a \u00abLa biblioteca di Babele\u00bb, il celebre racconto dello scrittore e poeta argentino Jorge Luis Borges, che immagina una biblioteca infinita capace di contenere tutti i libri possibili.<br><br><i>\u00abLa Biblioteca \u00e8 una sfera il cui centro esatto \u00e8 un qualsiasi esagono, la cui circonferenza \u00e8 inaccessibile.\u00bb</i><br><br>Frammento da \u00abLa biblioteca di Babele\u00bb, di Jorge Luis Borges.<br><br>MiBabel \u00e8 un\u2019applicazione gratuita, privata e progettata per essere utile. Se la trovi preziosa, puoi contribuire al suo sviluppo e aiutare questa biblioteca a continuare a crescere.',
    milestoneMsg:'Se MiBabel ti \u00e8 utile, ti invito a contribuire affinch\u00e9 questa biblioteca continui a crescere.',
    milestoneBtn:'Non ora',
     event:'Evento', task:'Compito', remindMe:'Ricordami',
    everyWeek:'Ogni settimana', everyMonth:'Ogni mese', everyYear:'Ogni anno', everyDay:'Ogni giorno',
    noRepeat:'Nessuna ripetizione', pending:'In sospeso', completed:'Completata', type:'Tipo', repeat:'Ripetizione',
    insertEquation:'Inserisci equazione', equationEditor:'Editor equazione',
    equationError:'L\'equazione contiene errori', editEquation:'Modifica equazione',
    latexPreview:'Anteprima', boardInsertEquation:'Inserisci equazione', equationPlaceholder:'Scrivi LaTeX qui...',
      stats:'Statistiche', about:'Informazioni', totalNotes:'Totale note', totalBoards:'Totale lavagne',
      totalStudySets:'Totale set', totalPostits:'Totale post-it', totalReminders:'Totale promemoria',
      totalWords:'Totale parole', versionLabel:'Versione', licenses:'Licenze', changelog:'Registro modifiche',
      developer:'Sviluppatore', contact:'Contatto', privacy:'Privacy', boardNoShadows:'Nascondi ombre', reduceMotion:'Riduci animazioni',
      weekStartsMonday:'La settimana inizia luned\u00ec', defaultBoardBg:'Sfondo lavagna predefinito',
      boardBgLabel:'Sfondo lavagna', boardShadowsLabel:'Mostra ombre post-it',
      boardAnimationsLabel:'Mostra animazioni', showStats:'Statistiche', showAbout:'Informazioni',
      monday:'Luned\u00ec', sunday:'Domenica',
      import:'Importa', importSuccess:'Elemento importato con successo',
      invalidFile:'File non valido o danneggiato',
      uuidConflict:'Esiste gi\u00e0 un elemento con questo ID. Verr\u00e0 generato un nuovo ID.',
      exportNote:'Esporta come nota', exportBoard:'Esporta come lavagna', exportStudySet:'Esporta come set'
    }
};
function t(key) { var l = langData[state.lang] || langData.en; return l[key] || key; }
function setLang(code) { state.lang = code; save(); applyLang(); applyTheme(); renderAll(); document.documentElement.lang = code; }
function fmtDate(ts) { if (!ts) return ''; var d = new Date(ts); return d.toLocaleDateString(); }
var Directory = {
  Documents: "DOCUMENTS",
  Data: "DATA",
  Library: "LIBRARY",
  Cache: "CACHE",
  External: "EXTERNAL",
  ExternalStorage: "EXTERNAL_STORAGE",
  ExternalCache: "EXTERNAL_CACHE",
  LibraryNoCloud: "LIBRARY_NO_CLOUD",
  Temporary: "TEMPORARY"
};


function saveFile(nombre, data, mime) {
  var p;
  if (typeof data === 'string') {
    p = Promise.resolve(btoa(unescape(encodeURIComponent(data))));
  } else if (data instanceof Uint8Array) {
    var binary = '';
    for (var i = 0; i < data.length; i++) binary += String.fromCharCode(data[i]);
    p = Promise.resolve(btoa(binary));
  } else if (data instanceof Blob) {
    p = new Promise(function(resolve, reject) {
      var reader = new FileReader();
      reader.onload = function() { resolve(reader.result.split(',')[1]); };
      reader.onerror = function() { reject(reader.error); };
      reader.readAsDataURL(data);
    });
  } else {
    p = Promise.reject('Unsupported data type');
  }
  return p.then(function(base64) {
    if (window.AndroidDownloader) {
      window.AndroidDownloader.save(nombre, base64, mime);
      showToast(t('checkDownloads'));
    } else {
      var dataUrl = 'data:' + (mime || 'application/octet-stream') + ';base64,' + base64;
      var a = document.createElement('a');
      a.href = dataUrl;
      a.download = nombre;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() { document.body.removeChild(a); }, 100);
    }
  }).catch(function(err) {
    console.error('Error exporting file:', err);
    setStatus('Error al exportar: ' + (err.message || JSON.stringify(err)));
  });
}

function _collectMediaRefsFromItem(item, type) {
  var refs = {};
  if (type === 'note' && item.items) {
    item.items.forEach(function(it) {
      if (it.src && (it.type === 'image' || it.type === 'audio' || it.type === 'video')) refs[it.src] = true;
    });
  }
  if (type === 'board') {
    if (item.postits) item.postits.forEach(function(p) {
      if (p.text) {
        var m = p.text.match(/<img[^>]+src="([^"]+)"/g);
        if (m) m.forEach(function(t) { var s = t.match(/src="([^"]+)"/); if (s && s[1]) refs[s[1]] = true; });
      }
    });
    if (item.elements) item.elements.forEach(function(el) { if (el.ref) refs[el.ref] = true; });
  }
  if (type === 'studySet' && item.cards) {
    item.cards.forEach(function(c) {
      ['front','back'].forEach(function(field) {
        if (c[field]) {
          var m = c[field].match(/<img[^>]+src="([^"]+)"/g);
          if (m) m.forEach(function(t) { var s = t.match(/src="([^"]+)"/); if (s && s[1]) refs[s[1]] = true; });
        }
      });
    });
  }
  return Object.keys(refs);
}

function exportItem(item, type) {
  var name = sanitizeFilename(item.title || item.name || type);
  var pkg = {
    formatVersion: 2,
    type: type,
    app: 'AppNotas',
    exportedAt: new Date().toISOString(),
    hasEmbeddedMedia: true,
    _media: {},
    data: JSON.parse(JSON.stringify(item))
  };
  var refs = _collectMediaRefsFromItem(item, type);
  if (refs.length === 0) {
    var jsonStr = JSON.stringify(pkg, null, 2);
    saveFile(name + '.json', jsonStr, 'application/json');
    return;
  }
  setStatus('Recopilando archivos multimedia...');
  var promises = refs.map(function(ref) {
    return ImageManager.read(ref).then(function(base64) {
      if (base64) pkg._media[ref] = base64;
    });
  });
  Promise.all(promises).then(function() {
    var jsonStr = JSON.stringify(pkg, null, 2);
    return saveFile(name + '.json', jsonStr, 'application/json');
  }).catch(function(err) {
    setStatus('Error al exportar: ' + (err.message || JSON.stringify(err)));
  });
}

function exportSingleNote(id) {
  var note = state.notes.find(function(n) { return n.id === id; });
  if (note) exportItem(note, 'note');
}

function exportSingleBoard(id) {
  var board = state.boards.find(function(b) { return b.id === id; });
  if (board) exportItem(board, 'board');
}

function exportSingleStudySet(id) {
  var set = state.studySets.find(function(s) { return s.id === id; });
  if (set) exportItem(set, 'studySet');
}

function exportData() {
  var manifest = {
    formatVersion: 2,
    app: 'AppNotas',
    createdAt: new Date().toISOString(),
    notesCount: state.notes.length
  };
  var config = {
    boards: state.boards,
    studySets: state.studySets,
    trash: state.trash,
    view: state.view,
    theme: state.theme,
    lang: state.lang,
    nextId: state.nextId,
    activeNoteId: state.activeNoteId,
    activeBoardId: state.activeBoardId,
    activeStudySetId: state.activeStudySetId,
    _exportCount: state._exportCount,
    _triggeredMilestones: state._triggeredMilestones,
    diaryPwdHash: state.diaryPwdHash,
    diaryRecoveryCode: state.diaryRecoveryCode,
    firstVisit: state.firstVisit,
    weekStartsMonday: state.weekStartsMonday,
    defaultBoardBg: state.defaultBoardBg,
    boardShowShadows: state.boardShowShadows,
    boardShowAnimations: state.boardShowAnimations
  };
  state.lastBackupAt = Date.now();
  save();
  var zip = new JSZip();
  zip.file('manifest.json', JSON.stringify(manifest, null, 2));
  zip.file('notas.json', JSON.stringify(state.notes, null, 2));
  zip.file('configuracion.json', JSON.stringify(config, null, 2));
  var now = new Date();
  var ys = now.getFullYear();
  var ms = String(now.getMonth() + 1).padStart(2, '0');
  var ds = String(now.getDate()).padStart(2, '0');
  var fileName = 'Backup_' + ys + '-' + ms + '-' + ds + '.anbk';
  setStatus('Generando copia de seguridad...');
  var usedRefs = ImageManager.collectUsedRefs();
  var imgLoadPromises = usedRefs.map(function(ref) {
    return ImageManager.read(ref).then(function(base64) {
      if (base64) {
        zip.file(ref, base64, { base64: true, createFolders: true });
      }
    });
  });
  Promise.all(imgLoadPromises).then(function() {
    return zip.generateAsync({ type: 'uint8array' });
  }).then(function(content) {
    var binary = '';
    for (var i = 0; i < content.length; i++) binary += String.fromCharCode(content[i]);
    var base64 = btoa(binary);
    if (window.AndroidDownloader) {
      window.AndroidDownloader.save(fileName, base64, 'application/zip');
      showToast(t('checkDownloads'));
      setStatus('Copia de seguridad guardada en Downloads');
    } else {
      var dataUrl = 'data:application/octet-stream;base64,' + base64;
      var a = document.createElement('a');
      a.href = dataUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() { document.body.removeChild(a); }, 100);
      setStatus('Descargando copia de seguridad...');
    }
  }).catch(function(err) {
    setStatus('Error al crear copia de seguridad: ' + (err.message || JSON.stringify(err)));
  });
}
function importData(input) {
  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    var dataUrl = e.target.result;
    var commaIndex = dataUrl.indexOf(',');
    if (commaIndex < 0) {
      alert('El archivo está corrupto o no es un ZIP válido.');
      return;
    }
    var base64 = dataUrl.substring(commaIndex + 1);
    JSZip.loadAsync(base64, { base64: true }).then(function(zip) {
      var manifestFile = zip.file('manifest.json');
      if (!manifestFile) {
        alert('El archivo no corresponde a una copia de seguridad válida de AppNotas.');
        return;
      }
      return manifestFile.async('string').then(function(manifestStr) {
        var manifest = JSON.parse(manifestStr);
        var version = manifest.formatVersion || 1;
        if (version !== 1 && version !== 2) {
          alert('Este archivo fue creado con una versión incompatible de la aplicación.');
          return;
        }
        var notasFile = zip.file('notas.json');
        var configFile = zip.file('configuracion.json');
        if (!notasFile || !configFile) {
          alert('El archivo está corrupto: falta ' + (!notasFile ? 'notas.json' : 'configuracion.json'));
          return;
        }
        return Promise.all([
          notasFile.async('string'),
          configFile.async('string')
        ]).then(function(results) {
          return { notas: JSON.parse(results[0]), config: JSON.parse(results[1]), zip: zip };
        });
      });
    }).then(function(data) {
      if (!data) return;
      var notas = data.notas, config = data.config, zip = data.zip;
      if (!notas || !config) {
        alert('El archivo está corrupto: no se pudieron interpretar los datos.');
        return;
      }
      if (!confirm('Se reemplazarán todos los datos actuales. ¿Continuar?')) return;
      /* Extraer imágenes del backup antes de reemplazar estado */
      var missingImages = [];
      var imgEntries = [];
      zip.forEach(function(relPath, zipEntry) {
        if (relPath.indexOf('imagenes/') === 0 && !zipEntry.dir) {
          imgEntries.push(relPath);
        }
      });
      var imgRestorePromises = imgEntries.map(function(imgRef) {
        return zip.file(imgRef).async('base64').then(function(imgBase64) {
          return ImageManager.save(imgRef, imgBase64);
        }).catch(function(err) {
          missingImages.push(imgRef);
          console.warn('Error restoring image:', imgRef, err);
        });
      });
      return Promise.all(imgRestorePromises).then(function() {
        state.notes = notas || [];
        state.notes.forEach(function(n) { if (!n.events) n.events = []; if (!n.tasks) n.tasks = []; });
        state.boards = config.boards || [];
        state.studySets = config.studySets || [];
        state.trash = config.trash || [];
        state.view = config.view || 'notes';
        state.theme = config.theme || 'dark';
        state.lang = config.lang || 'en';
        state.nextId = config.nextId || Date.now();
        state.activeNoteId = config.activeNoteId || null;
        state.activeBoardId = config.activeBoardId || null;
        state.activeStudySetId = config.activeStudySetId || null;
        state._exportCount = config._exportCount || 0;
        state._triggeredMilestones = config._triggeredMilestones || [];
        state.diaryPwdHash = config.diaryPwdHash || '';
        state.diaryRecoveryCode = config.diaryRecoveryCode || '';
        state.firstVisit = config.firstVisit !== undefined ? config.firstVisit : false;
        save();
        closeDialog('settingsDialog');
        renderAll();
        if (missingImages.length > 0) {
          alert('Datos restaurados. Faltaron ' + missingImages.length + ' imagen(es) que no pudieron restaurarse. Revisa la consola para más detalles.');
        } else {
          alert('Datos restaurados correctamente.');
        }
      });
    }).catch(function(err) {
      setStatus('');
      console.error('Import error:', err);
      alert('El archivo está corrupto o no es un ZIP válido.');
    });
  };
  reader.readAsDataURL(file);
  input.value = '';
}
function importSingleItem(input) {
  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    var jsonStr = e.target.result;
    var pkg;
    try { pkg = JSON.parse(jsonStr); } catch(e) { alert(t('invalidFile')); return; }
    if (!pkg || !pkg.type || !pkg.data || !pkg.data.id) { alert(t('invalidFile')); return; }
    if (pkg.formatVersion !== 1 && pkg.formatVersion !== 2) { alert(t('invalidFile')); return; }
    var type = pkg.type;
    var data = pkg.data;
    if (type === 'note' && !data.title) { alert(t('invalidFile')); return; }
    if (type === 'board' && !data.name) { alert(t('invalidFile')); return; }
    if (type === 'studySet' && !data.name) { alert(t('invalidFile')); return; }
    if (type !== 'note' && type !== 'board' && type !== 'studySet') { alert(t('invalidFile')); return; }

    var restoreMedia = Promise.resolve();
    if (pkg.hasEmbeddedMedia && pkg._media) {
      restoreMedia = Promise.all(Object.keys(pkg._media).map(function(ref) {
        return ImageManager.save(ref, pkg._media[ref]).catch(function(err) {
          console.warn('Error restoring media:', ref, err);
        });
      }));
    }

    restoreMedia.then(function() {
      var existingArr, key;
      if (type === 'note') { existingArr = state.notes; key = 'title'; }
      else if (type === 'board') { existingArr = state.boards; key = 'name'; }
      else { existingArr = state.studySets; key = 'name'; }

      var conflict = existingArr.find(function(ex) { return ex.id === data.id; });
      if (conflict) {
        if (!confirm(t('uuidConflict'))) return;
        data.id = genId();
      }
      existingArr.push(data);
      save();
      renderAll();
      showToast(t('importSuccess'));
    });
  };
  reader.readAsText(file);
  input.value = '';
}
function generateRecoveryCode() {
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var code = '';
  for (var i = 0; i < 8; i++) {
    if (i === 4) code += '-';
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
function showDiaryRecoveryCode(code) {
  document.getElementById('recoveryCodeDisplay').textContent = code;
  showDialog('recoveryCodeDialog');
}
function setDiaryPassword() {
  document.getElementById('diaryPwdTitle').textContent = t('diaryPwdSetTitle');
  document.getElementById('diaryOldPwdField').style.display = 'none';
  document.getElementById('diaryNewPwdField').style.display = '';
  document.getElementById('diaryNewPwdInput').value = '';
  window._diaryPwdMode = 'set';
  showDialog('diaryPwdDialog');
  setTimeout(function(){ document.getElementById('diaryNewPwdInput').focus(); }, 100);
}
function changeDiaryPassword() {
  document.getElementById('diaryPwdTitle').textContent = t('diaryPwdChangeTitle');
  document.getElementById('diaryOldPwdField').style.display = '';
  document.getElementById('diaryOldPwdInput').value = '';
  document.getElementById('diaryNewPwdField').style.display = '';
  document.getElementById('diaryNewPwdInput').value = '';
  window._diaryPwdMode = 'change';
  showDialog('diaryPwdDialog');
  setTimeout(function(){ document.getElementById('diaryOldPwdInput').focus(); }, 100);
}
function removeDiaryPassword() {
  document.getElementById('diaryPwdTitle').textContent = t('diaryPwdRemoveTitle');
  document.getElementById('diaryOldPwdField').style.display = '';
  document.getElementById('diaryOldPwdInput').value = '';
  document.getElementById('diaryNewPwdField').style.display = 'none';
  window._diaryPwdMode = 'remove';
  showDialog('diaryPwdDialog');
  setTimeout(function(){ document.getElementById('diaryOldPwdInput').focus(); }, 100);
}
function confirmDiaryPwd() {
  var mode = window._diaryPwdMode;
  var newPwd = document.getElementById('diaryNewPwdInput').value;
  if (mode === 'set') {
    if (!newPwd) { alert(t('diaryPwdAlertEmpty')); return; }
    state.diaryPwdHash = hashPwd(newPwd);
    state.diaryRecoveryCode = generateRecoveryCode();
    closeDialog('diaryPwdDialog');
    save();
    renderDiaryPwdSection();
    showDiaryRecoveryCode(state.diaryRecoveryCode);
  } else {
    var oldPwd = document.getElementById('diaryOldPwdInput').value;
    if (hashPwd(oldPwd) !== state.diaryPwdHash) { alert(t('diaryPwdAlertWrong')); return; }
    if (mode === 'change') {
      if (!newPwd) { alert(t('diaryPwdAlertNewEmpty')); return; }
      state.diaryPwdHash = hashPwd(newPwd);
      state.diaryRecoveryCode = generateRecoveryCode();
      closeDialog('diaryPwdDialog');
      save();
      renderDiaryPwdSection();
      showDiaryRecoveryCode(state.diaryRecoveryCode);
    } else if (mode === 'remove') {
      state.diaryPwdHash = '';
      state.diaryRecoveryCode = '';
      diaryUnlocked = false;
      closeDialog('diaryPwdDialog');
      save();
      renderDiaryPwdSection();
    }
  }
}
function renderDiaryPwdSection() {
  var status = document.getElementById('diaryPwdStatus');
  var actions = document.getElementById('diaryPwdActions');
  if (!status || !actions) return;
  if (state.diaryPwdHash) {
    status.innerHTML = '<span style="color:var(--accent);font-size:13px;">&#x1f512; ' + t('diaryPwdSet') + '</span>';
    actions.innerHTML = '<button class="btn" onclick="changeDiaryPassword()">' + t('diaryPwdChange') + '</button><button class="btn" onclick="removeDiaryPassword()">' + t('diaryPwdRemove') + '</button>';
  } else {
    status.innerHTML = '<span style="color:var(--text-muted);font-size:13px;">' + t('diaryPwdNone') + '</span>';
    actions.innerHTML = '<button class="btn" onclick="setDiaryPassword()">' + t('diaryPwdSetBtn') + '</button>';
  }
}
function diaryUnlockFlow() {
  if (!state.diaryPwdHash) return true;
  if (diaryUnlocked) return true;
  pendingUnlock = { type: 'diary', id: null };
  document.getElementById('unlockPwdInput').value = '';
  document.getElementById('unlockPwdInput').style.display = '';
  document.getElementById('unlockTitle').textContent = t('diaryProtected');
  document.getElementById('unlockMsg').style.display = '';
  document.getElementById('unlockMsg').innerHTML = '<a href="#" onclick="event.preventDefault();recoverDiaryAccess();" style="color:var(--accent);font-size:12px;">' + t('diaryForgotPwd') + '</a>';
  document.getElementById('unlockConfirmBtn').textContent = 'Confirmar';
  showDialog('unlockDialog');
  setTimeout(function(){ document.getElementById('unlockPwdInput').focus(); }, 100);
  return false;
}
function recoverDiaryAccess() {
  var code = prompt(t('recoveryPrompt'));
  if (!code) return;
  if (code.trim().toUpperCase() !== state.diaryRecoveryCode) {
    alert(t('recoveryWrong'));
    return;
  }
  state.diaryPwdHash = '';
  state.diaryRecoveryCode = '';
  diaryUnlocked = true;
  closeDialog('unlockDialog');
  pendingUnlock = null;
  save();
  renderDiaryPwdSection();
  switchView('diary');
}
function applyLang() {
  var l = function(id, key) { var el = document.getElementById(id); if (el) el.textContent = t(key); };
  var ml = function(id, key) { var el = document.querySelector('#' + id + ' .label'); if (el) el.textContent = t(key); };
  ml('menuNotes','notes'); ml('menuDiary','diary'); ml('menuBoard','board');
  var sm = document.getElementById('menuStudy');
  if (sm) sm.querySelector('.label').textContent = t('studyCards');
  var sl = document.querySelector('#menuSettings .settings-label');
  if (sl) sl.textContent = t('settings');
  var cm = document.getElementById('menuCafecito');
  if (cm) cm.querySelector('.label').textContent = 'Expandir la Biblioteca';
  document.getElementById('menuTheme').querySelector('.theme-label').textContent = state.theme === 'light' ? t('lightTheme') : t('darkTheme');
  l('newNoteTitleLabel','title'); l('newNotePwdLabel','passwordOptional');
  l('newBoardNameLabel','name'); l('newBoardPwdLabel','passwordOptional');
  l('settingsLangLabel','language');
  var nnt = document.getElementById('newNoteTitle');
  if (nnt) nnt.placeholder = t('noteTitlePlaceholder');
  var nnp = document.getElementById('newNotePwd');
  if (nnp) nnp.placeholder = t('leaveEmpty');
  var nbn = document.getElementById('newBoardName');
  if (nbn) nbn.placeholder = t('boardNamePlaceholder');
  var nbp = document.getElementById('newBoardPwd');
  if (nbp) nbp.placeholder = t('leaveEmpty');
  l('newNoteTitle_','newNote'); l('newBoardTitle','newBoard');
  l('tableDialogTitle','insertTable');
  l('tableRowsLabel','tableRows');
  l('tableColsLabel','tableCols');
  l('tableCancelBtn','cancel');
  l('tableCreateBtn','createTable');
  // Unlock dialog
  l('unlockTitle','enterPassword');
  var uip = document.getElementById('unlockPwdInput');
  if (uip) uip.placeholder = t('enterPassword');
  // Empty states
  l('emptyNotesTitle','notes'); l('emptyNotesSub','selectNote');
  l('emptyBoardTitle','boards'); l('emptyBoardSub','selectBoard');
  // Back button
  var bb = document.getElementById('headerBackBtn');
  if (bb) bb.innerHTML = '&#x21A9;';
  // Buttons
  l('newNoteCancelBtn','cancel'); l('newNoteCreateBtn','create');
  l('newBoardCancelBtn','cancel'); l('newBoardCreateBtn','create');
  l('unlockCancelBtn','cancel'); l('unlockConfirmBtn','confirm');
  l('settingsDialogTitle','settings');
  l('linkHelpTitle','linkHelpTitle');
  l('linkToNoteDesc','linkToNote');
  l('linkToUrlDesc','linkToUrl');
  l('diaryPwdLabel','diaryPwdLabel');
  l('diaryOldPwdLabel','diaryPwdOldLabel');
  l('diaryNewPwdLabel','diaryPwdNewLabel');
  var dop = document.getElementById('diaryOldPwdInput');
  if (dop) dop.placeholder = t('diaryPwdOldLabel');
  var dnp = document.getElementById('diaryNewPwdInput');
  if (dnp) dnp.placeholder = t('diaryPwdNewLabel');
  l('diaryPwdCancelBtn','cancel');
  l('diaryPwdConfirmBtn','confirm');
  l('recoveryDialogTitle','recoveryDialogTitle');
  l('recoveryDialogMsg','recoveryDialogMsg');
  l('recoveryDialogBtn','recoveryDialogBtn');
  l('milestoneMsg','milestoneMsg');
  l('milestoneBtn','milestoneBtn');
  l('migrateLabel','migrateLabel');
  l('exportBtn','exportBtn');
  l('importBtn','importBtn');
  // Menu label for trash
  var mt = document.getElementById('menuTrash');
  if (mt) mt.querySelector('.label').textContent = t('trash');
  var scb = document.getElementById('settingsCloseBtn');
  if (scb) scb.textContent = t('close');
  // Study card dialog
  l('newStudySetTitle','newSetTitle');
  l('newStudySetNameLabel','name');
  l('studyCardFrontLabel','front');
  l('studyCardBackLabel','back');
  l('studyCardSaveBtn','save');
  l('studyCardPreviewLabel','preview');
  l('studyCardPreviewInsertBtn','insert');
  l('studyCardPreviewCancelBtn','cancel');
  var scf = document.getElementById('studyCardFront');
  if (scf) scf.dataset.placeholder = t('front');
  var scbk = document.getElementById('studyCardBack');
  if (scbk) scbk.dataset.placeholder = t('back');
  var nsn = document.getElementById('newStudySetName');
  if (nsn) nsn.placeholder = t('setName');
  var ibf = document.getElementById('studyCardImgBtnFront');
  if (ibf) ibf.title = t('insertImage');
  var ibb = document.getElementById('studyCardImgBtnBack');
  if (ibb) ibb.title = t('insertImage');
  // Welcome dialog
  l('welcomeTitle','welcomeTitle');
  l('welcomeLangLabel','language');
  var wm = document.getElementById('welcomeMsg');
  if (wm) wm.innerHTML = t('welcomeMsg');
  var wge = document.getElementById('welcomeGotItBtn');
  if (wge) wge.textContent = t('understood');
  var wls = document.getElementById('welcomeLangSelect');
  if (wls) wls.value = state.lang || 'en';
  /* Reminder dialog */
  var rdTitle = document.querySelector('#dialogReminder .dialog-title');
  if (rdTitle) rdTitle.textContent = t('remindMe');
  var rdTypeLbl = document.querySelector('#dialogReminder label[for="reminderType"]');
  if (rdTypeLbl) rdTypeLbl.textContent = t('type');
  var rdTypeOpts = document.querySelectorAll('#reminderType option');
  if (rdTypeOpts.length >= 2) { rdTypeOpts[0].textContent = t('event'); rdTypeOpts[1].textContent = t('task'); }
  var rdRepeatLbl = document.querySelector('#dialogReminder label[for="reminderRepeat"]');
  if (rdRepeatLbl) rdRepeatLbl.textContent = t('repeat');
  var rdTitleLbl = document.querySelector('#dialogReminder label[for="reminderTitle"]');
  if (rdTitleLbl) rdTitleLbl.textContent = t('title');
  var rdTitleInput = document.getElementById('reminderTitle');
  if (rdTitleInput) rdTitleInput.placeholder = t('title');
  var rdBtns = document.querySelectorAll('#dialogReminder .dialog-actions .btn');
  if (rdBtns.length >= 2) { rdBtns[0].textContent = t('cancel'); rdBtns[1].textContent = t('create'); }
  /* New settings labels */
  l('statsTitle','stats'); l('aboutTitle','about');
  l('statsBtn','showStats'); l('aboutBtn','showAbout');
  l('weekStartLabel','weekStartsMonday');
  l('boardBgLabel','boardBgLabel'); l('boardShadowsLabel','boardShadowsLabel');
  l('boardAnimationsLabel','boardAnimationsLabel');
  l('statsCloseBtn', 'close'); l('aboutCloseBtn', 'close');
  /* Week start options */
  l('weekStartMonday','monday'); l('weekStartSunday','sunday');
  /* Diary password section */
  renderDiaryPwdSection();
  /* Settings toggle states */
  updateSettingsToggleStates();
}

var state = { notes: [], boards: [], studySets: [], trash: [], activeNoteId: null, activeBoardId: null, activeStudySetId: null, view: 'notes', theme: 'dark', lang: 'en', nextId: Date.now(), _exportCount: 0, _triggeredMilestones: [], diaryPwdHash: '', diaryRecoveryCode: '', firstVisit: true, weekStartsMonday: true, defaultBoardBg: 'cork', boardShowShadows: true, boardShowAnimations: true, lastBackupAt: null };
var dragState = null;
var cardDragState = null;
var connectState = null;
var postitDragState = null;
var boardPanState = null;
var diaryUnlocked = false;
var _calMonth, _calYear, _calSelectedDay;

/* Media blob URLs cache to avoid reloading */
var _mediaBlobUrls = {};

/* Container for global clipboard for board elements */
var _boardElementClipboard = null;

function resetDiaryCalendarToToday() {
  var d = new Date();
  _calMonth = d.getMonth();
  _calYear = d.getFullYear();
  _calSelectedDay = { day: d.getDate(), month: d.getMonth(), year: d.getFullYear() };
}

function dateStr(d, m, y) { return d + '-' + (m + 1) + '-' + y; }

function getDiaryNote(d, m, y) {
  var s = dateStr(d, m, y);
  return state.notes.find(function(n) { return n.diary && n.title === s; });
}
function doesDayHaveReminder(d, m, y) {
  var targetDate = new Date(y, m, d);
  var ownNote = getDiaryNote(d, m, y);
  if (ownNote && ((ownNote.events && ownNote.events.length > 0) || (ownNote.tasks && ownNote.tasks.length > 0))) {
    return true;
  }
  for (var i = 0; i < state.notes.length; i++) {
    var n = state.notes[i];
    if (!n.diary) continue;
    var all = (n.events || []).concat(n.tasks || []);
    for (var j = 0; j < all.length; j++) {
      if (all[j].repetition && all[j].repetition !== 'none' && repetitionMatchesToday(all[j], targetDate)) return true;
    }
  }
  return false;
}

function selectCalendarDay(d, m, y) {
  _calSelectedDay = { day: d, month: m, year: y };
  renderCalendarGrid();
}

function openCalendarDay(d, m, y) {
  if (!diaryUnlockFlow()) return;
  var note = getDiaryNote(d, m, y);
  if (!note) {
    note = { id: genId(), title: dateStr(d, m, y), items: [], pwdHash: '', diary: true };
    state.notes.push(note);
    save();
  }
  state.activeNoteId = note.id;
  state.view = 'diary';
  save();
  renderAll();
}

function updateCalendarHeader() {
  var months = t('months');
  var monthEl = document.querySelector('.cal-month');
  var yearEl = document.querySelector('.cal-year');
  if (monthEl) monthEl.textContent = months[_calMonth];
  if (yearEl) yearEl.textContent = String(_calYear);
}

function prevMonth() {
  if (_calYear <= 2000 && _calMonth === 0) return;
  _calMonth--;
  if (_calMonth < 0) { _calMonth = 11; _calYear--; }
  updateCalendarHeader();
  renderCalendarGrid();
}

function nextMonth() {
  if (_calYear >= 2500 && _calMonth === 11) return;
  _calMonth++;
  if (_calMonth > 11) { _calMonth = 0; _calYear++; }
  updateCalendarHeader();
  renderCalendarGrid();
}

function goToMonth(m, y) {
  if (y < 2000 || y > 2500) return;
  _calMonth = Math.max(0, Math.min(11, m));
  _calYear = y;
  renderDiaryCalendar();
}

function showMonthPicker() {
  var months = t('months');
  var html = '<div class="cal-picker-overlay" onclick="closeCalendarPicker()"><div class="cal-picker" onclick="event.stopPropagation()">';
  for (var i = 0; i < 12; i++) {
    var active = i === _calMonth ? ' active' : '';
    html += '<div class="cal-picker-item' + active + '" onclick="goToMonth(' + i + ',' + _calYear + ')">' + months[i] + '</div>';
  }
  html += '</div></div>';
  var el = document.getElementById('diaryContent');
  if (el) el.insertAdjacentHTML('beforeend', html);
}

function showYearPicker() {
  var html = '<div class="cal-picker-overlay" onclick="closeCalendarPicker()"><div class="cal-picker" onclick="event.stopPropagation()">';
  for (var y = 2000; y <= 2500; y++) {
    var active = y === _calYear ? ' active' : '';
    html += '<div class="cal-picker-item' + active + '" onclick="goToMonth(' + _calMonth + ',' + y + ')">' + y + '</div>';
  }
  html += '</div></div>';
  var el = document.getElementById('diaryContent');
  if (el) el.insertAdjacentHTML('beforeend', html);
}

function closeCalendarPicker() {
  var el = document.querySelector('.cal-picker-overlay');
  if (el) el.remove();
}

function handleCalendarSearch(val) {
  var m = val.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return;
  var d = parseInt(m[1], 10), mo = parseInt(m[2], 10) - 1, y = parseInt(m[3], 10);
  if (y < 2000 || y > 2500 || mo < 0 || mo > 11 || d < 1 || d > 31) return;
  goToMonth(mo, y);
  _calSelectedDay = { day: d, month: mo, year: y };
  renderCalendarGrid();
}

function renderCalendarHeader() {
  var months = t('months');
  var html =
    '<div class="cal-search"><input class="cal-search-input" type="text" placeholder="' + t('searchDate') + '" oninput="handleCalendarSearch(this.value)"></div>' +
    '<div class="cal-nav">' +
      '<div class="cal-month-year">' +
        '<span class="cal-month" onclick="showMonthPicker()">' + months[_calMonth] + '</span>' +
        '<span class="cal-year" onclick="showYearPicker()">' + _calYear + '</span>' +
      '</div>' +
    '</div>';
  return html;
}

function renderCalendarGrid() {
  var wrap = document.getElementById('calDaysWrap');
  if (!wrap) return;
  var dayAbbrs = t('dayAbbr');
  if (state.weekStartsMonday) dayAbbrs = dayAbbrs.slice(1).concat(dayAbbrs[0]);
  var firstDay = new Date(_calYear, _calMonth, 1).getDay();
  if (state.weekStartsMonday) firstDay = (firstDay + 6) % 7;
  var daysInMonth = new Date(_calYear, _calMonth + 1, 0).getDate();
  var daysInPrev = new Date(_calYear, _calMonth, 0).getDate();
  var today = new Date();
  var html = '<div class="cal-weekdays">';
  for (var w = 0; w < 7; w++) {
    html += '<div class="cal-weekday">' + dayAbbrs[w] + '</div>';
  }
  html += '</div><div class="cal-days">';
  var totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  for (var i = 0; i < totalCells; i++) {
    var cellDay, cellMonth, cellYear, cls = 'cal-day';
    if (i < firstDay) {
      cellDay = daysInPrev - firstDay + i + 1;
      cellMonth = _calMonth - 1;
      cellYear = _calYear;
      if (cellMonth < 0) { cellMonth = 11; cellYear--; }
      cls += ' other-month';
    } else if (i >= firstDay + daysInMonth) {
      cellDay = i - firstDay - daysInMonth + 1;
      cellMonth = _calMonth + 1;
      cellYear = _calYear;
      if (cellMonth > 11) { cellMonth = 0; cellYear++; }
      cls += ' other-month';
    } else {
      cellDay = i - firstDay + 1;
      cellMonth = _calMonth;
      cellYear = _calYear;
    }
    if (_calSelectedDay && cellDay === _calSelectedDay.day && cellMonth === _calSelectedDay.month && cellYear === _calSelectedDay.year) {
      cls += ' selected';
    }
    if (cellDay === today.getDate() && cellMonth === today.getMonth() && cellYear === today.getFullYear()) {
      cls += ' today';
    }
    var note = getDiaryNote(cellDay, cellMonth, cellYear);
    if (note) cls += ' has-note';
    if (doesDayHaveReminder(cellDay, cellMonth, cellYear)) {
      cls += ' has-reminder';
    }
    html += '<div class="' + cls + '" data-day="' + cellDay + '" data-month="' + cellMonth + '" data-year="' + cellYear + '" onclick="selectCalendarDay(' + cellDay + ',' + cellMonth + ',' + cellYear + ')" ondblclick="openCalendarDay(' + cellDay + ',' + cellMonth + ',' + cellYear + ')">' +
      '<span class="cal-day-num">' + cellDay + '</span></div>';
  }
  html += '</div>';
  wrap.innerHTML = html;
  closeCalendarPicker();
}

function renderDiaryCalendar() {
  if (_calMonth === undefined || _calMonth === null) resetDiaryCalendarToToday();
  var container = document.getElementById('diaryContent');
  if (!container) return;
  var html = '<div class="diary-calendar">' +
    renderCalendarHeader() +
    '<div class="cal-days-wrap" id="calDaysWrap">';
  html += '</div></div>';
  container.innerHTML = html;
  renderCalendarGrid();
  setupCalendarSwipe();
}

function setupCalendarSwipe() {
  var wrap = document.getElementById('calDaysWrap');
  if (!wrap) return;
  var startX = 0, currentX = 0, moving = false;
  function onStart(e) {
    startX = e.touches[0].clientX;
    currentX = 0;
    moving = false;
    wrap.style.transition = 'none';
  }
  function onMove(e) {
    if (startX === 0) return;
    var dx = e.touches[0].clientX - startX;
    if (Math.abs(dx) > 10) {
      moving = true;
      currentX = dx;
      wrap.style.transform = 'translateX(' + dx + 'px)';
      e.preventDefault();
    }
  }
  function onEnd() {
    if (!moving) { startX = 0; return; }
    wrap.style.transition = 'transform 0.2s ease';
    if (currentX < -50) {
      wrap.style.transform = 'translateX(-100%)';
      setTimeout(function() {
        wrap.style.transition = 'none';
        wrap.style.transform = '';
        nextMonth();
      }, 200);
    } else if (currentX > 50) {
      wrap.style.transform = 'translateX(100%)';
      setTimeout(function() {
        wrap.style.transition = 'none';
        wrap.style.transform = '';
        prevMonth();
      }, 200);
    } else {
      wrap.style.transform = '';
    }
    startX = 0;
    moving = false;
  }
  wrap.addEventListener('touchstart', onStart, { passive: false });
  wrap.addEventListener('touchmove', onMove, { passive: false });
  wrap.addEventListener('touchend', onEnd);
  wrap.addEventListener('touchcancel', onEnd);
}

function renderDiaryView() {
  if (state.activeNoteId) {
    renderNoteContent();
  } else {
    if (!_calMonth && _calMonth !== 0) resetDiaryCalendarToToday();
    renderDiaryCalendar();
  }
}

var POSTIT_COLORS = ['yellow', 'green', 'blue', 'pink', 'orange'];
var COLOR_VALS = { yellow: '#fff8b0', green: '#b5e8b5', blue: '#b5d4e8', pink: '#f8c8d8', orange: '#f8d4a8' };
var boardZoom = 1;
var pinchState = null;

/* Crea un reproductor de audio dentro de un contenedor.
   ref: ruta del archivo multimedia (ej: 'audios/uuid.mp3')
   container: elemento DOM donde insertar el reproductor
   options: { autoplay, onplay, onpause, onend }
   Devuelve el elemento del reproductor */
function createAudioPlayer(ref, container, options) {
  options = options || {};
  var wrapper = document.createElement('div');
  wrapper.className = 'audio-player';

  var controlsRow = document.createElement('div');
  controlsRow.className = 'ap-controls';

  var playBtn = document.createElement('button');
  playBtn.className = 'ap-play';
  playBtn.innerHTML = '&#x25B6;';
  playBtn.title = 'Play';

  var restartBtn = document.createElement('button');
  restartBtn.className = 'ap-restart';
  restartBtn.innerHTML = '&#x21BA;';
  restartBtn.title = 'Restart';

  controlsRow.appendChild(playBtn);
  controlsRow.appendChild(restartBtn);

  var timeRow = document.createElement('div');
  timeRow.className = 'ap-time-row';

  var curTime = document.createElement('span');
  curTime.className = 'ap-time';
  curTime.textContent = '00:00';

  var totalTime = document.createElement('span');
  totalTime.className = 'ap-time';
  totalTime.textContent = '00:00';

  timeRow.appendChild(curTime);
  timeRow.appendChild(totalTime);

  wrapper.appendChild(controlsRow);
  wrapper.appendChild(timeRow);
  container.appendChild(wrapper);

  var audio = document.createElement('audio');
  audio.preload = 'metadata';

  var loaded = false;
  var _playRequested = false;
  var url = _mediaBlobUrls[ref];

  function loadAudio() {
    if (loaded) return;
    loaded = true;
    if (!url) {
      var cachedUrl = _mediaBlobUrls[ref];
      if (cachedUrl) {
        url = cachedUrl;
        audio.src = url;
        return;
      }
      ImageManager.read(ref).then(function(base64) {
        if (!base64) {
          playBtn.innerHTML = '&#x2716;';
          playBtn.title = 'Error loading audio';
          return;
        }
        var mime = ImageConverter.getMimeFromRef(ref);
        var blob = _base64ToBlob(base64, mime);
        url = URL.createObjectURL(blob);
        _mediaBlobUrls[ref] = url;
        audio.src = url;
        if (options.autoplay) audio.play();
      });
    } else {
      audio.src = url;
      if (options.autoplay) audio.play();
    }
  }

  function formatTime(sec) {
    if (isNaN(sec) || sec === Infinity || sec < 0) return '00:00';
    var m = Math.floor(sec / 60);
    var s = Math.floor(sec % 60);
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  function updateUI() {
    curTime.textContent = formatTime(audio.currentTime);
    if (audio.duration && isFinite(audio.duration)) {
      totalTime.textContent = formatTime(audio.duration);
    }
  }

  audio.addEventListener('loadedmetadata', function() {
    totalTime.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('timeupdate', function() {
    updateUI();
  });

  audio.addEventListener('ended', function() {
    audio.currentTime = 0;
    _playRequested = false;
    playBtn.innerHTML = '&#x25B6;';
    curTime.textContent = '00:00';
    if (options.onend) options.onend();
  });

  playBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    loadAudio();
    if (audio.paused && !_playRequested) {
      _playRequested = true;
      audio.play().then(function() { _playRequested = false; }).catch(function() { _playRequested = false; });
      playBtn.innerHTML = '&#x23F8;';
    } else if (!audio.paused) {
      _playRequested = false;
      audio.pause();
      playBtn.innerHTML = '&#x25B6;';
    }
  });

  restartBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    loadAudio();
    _playRequested = false;
    audio.currentTime = 0;
    curTime.textContent = '00:00';
    playBtn.innerHTML = '&#x25B6;';
  });

  /* Limpiar al eliminar el wrapper */
  wrapper._cleanup = function() {
    audio.pause();
    audio.src = '';
  };

  return wrapper;
}

/* Convierte base64 a Blob */
function _base64ToBlob(base64, mime) {
  var binary = atob(base64);
  var len = binary.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

function save() { try { localStorage.setItem('appnotas', JSON.stringify(state)); } catch(e) {} }
function load() {
  try {
    var d = localStorage.getItem('appnotas');
    if (d) { state = JSON.parse(d);
      if (!state.nextId) state.nextId = Date.now();
      if (!state.notes) state.notes = [];
      if (!state.boards) state.boards = [];
      if (!state.studySets) state.studySets = [];
      if (!state.trash) state.trash = [];
      if (!state.view) state.view = 'notes';
      if (!state.theme) state.theme = 'dark';
      if (!state.lang) state.lang = 'en';
      if (!state._exportCount) state._exportCount = 0;
      if (!state._triggeredMilestones) state._triggeredMilestones = [];
    if (!state.diaryPwdHash) state.diaryPwdHash = '';
    if (!state.diaryRecoveryCode) state.diaryRecoveryCode = '';
    if (state.firstVisit === undefined) state.firstVisit = false;
    if (state.weekStartsMonday === undefined) state.weekStartsMonday = true;
    if (!state.defaultBoardBg) state.defaultBoardBg = 'cork';
    if (state.boardShowShadows === undefined) state.boardShowShadows = true;
    if (state.boardShowAnimations === undefined) state.boardShowAnimations = true;
    if (state.lastBackupAt === undefined) state.lastBackupAt = null;
    delete state.persistentNotifActive;
    if (state.boards) state.boards.forEach(function(b) { if (!b.elements) b.elements = []; });
  }
    if (state.notes) state.notes.forEach(function(n) {
      if (!n.events) n.events = [];
      if (!n.tasks) n.tasks = [];
    });
    cleanupTrash();
  } catch(e) { console.warn('Error loading', e); }
}

function genId() { return state.nextId++; }
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function applyBoardZoom() {
  var wrap = document.querySelector('.board-canvas-wrap');
  if (!wrap) return;
  var layer = wrap.querySelector('.board-zoom-layer');
  var inner = wrap.querySelector('.board-canvas-inner');
  if (!layer || !inner) return;
  var vz = Math.max(0.2, Math.min(3, boardZoom));
  boardZoom = vz;
  var baseW = parseInt(inner.style.width) || parseInt(layer.style.width) || 3000;
  var baseH = parseInt(inner.style.height) || parseInt(layer.style.height) || 3000;
  var layerW = Math.max(baseW * vz, wrap.clientWidth);
  var layerH = Math.max(baseH * vz, wrap.clientHeight);
  layer.style.width = layerW + 'px';
  layer.style.height = layerH + 'px';
  inner.style.transform = 'scale(' + vz + ')';
}

function resetBoardZoom() {
  boardZoom = 1;
  applyBoardZoom();
  var wrap = document.querySelector('.board-canvas-wrap');
  if (wrap) wrap.scrollLeft = wrap.scrollTop = 0;
  var btn = document.querySelector('.board-toolbar .btn[onclick*="resetBoardZoom"]');
  if (btn) btn.textContent = '100%';
}

// Ctrl+wheel zoom (PC)
document.addEventListener('wheel', function(e) {
  if (!e.ctrlKey) return;
  var wrap = e.target.closest('.board-canvas-wrap');
  if (!wrap) return;
  e.preventDefault();
  var layer = wrap.querySelector('.board-zoom-layer');
  var inner = wrap.querySelector('.board-canvas-inner');
  if (!layer || !inner) return;
  var oldZoom = boardZoom;
  var delta = -e.deltaY * 0.001;
  boardZoom = Math.max(0.2, Math.min(3, boardZoom * (1 + delta)));
  applyBoardZoom();
  // Zoom toward cursor
  var rect = wrap.getBoundingClientRect();
  var cx = e.clientX - rect.left;
  var cy = e.clientY - rect.top;
  wrap.scrollLeft = (cx + wrap.scrollLeft) * boardZoom / oldZoom - cx;
  wrap.scrollTop = (cy + wrap.scrollTop) * boardZoom / oldZoom - cy;
  var btn = document.querySelector('.board-toolbar .btn[onclick*="resetBoardZoom"]');
  if (btn) btn.textContent = Math.round(boardZoom * 100) + '%';
}, { passive: false });

// Pinch-to-zoom (Android)
document.addEventListener('touchstart', function(e) {
  if (e.touches.length !== 2) return;
  var wrap = e.target.closest('.board-canvas-wrap');
  if (!wrap) return;
  postitDragState = null;
  boardPanState = null;
  var t = e.touches;
  pinchState = {
    wrap: wrap,
    dist: Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY),
    zoom: boardZoom,
    cx: (t[0].clientX + t[1].clientX) / 2,
    cy: (t[0].clientY + t[1].clientY) / 2
  };
}, { passive: true });

document.addEventListener('touchmove', function(e) {
  if (!pinchState || e.touches.length !== 2) return;
  e.preventDefault();
  var t = e.touches;
  var newDist = Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
  var ratio = newDist / pinchState.dist;
  var oldZoom = boardZoom;
  boardZoom = Math.max(0.2, Math.min(3, pinchState.zoom * ratio));
  applyBoardZoom();
  // Zoom toward midpoint
  var wrap = pinchState.wrap;
  var rect = wrap.getBoundingClientRect();
  var mx = pinchState.cx - rect.left;
  var my = pinchState.cy - rect.top;
  wrap.scrollLeft = (mx + wrap.scrollLeft) * boardZoom / oldZoom - mx;
  wrap.scrollTop = (my + wrap.scrollTop) * boardZoom / oldZoom - my;
  var btn = document.querySelector('.board-toolbar .btn[onclick*="resetBoardZoom"]');
  if (btn) btn.textContent = Math.round(boardZoom * 100) + '%';
}, { passive: false });

document.addEventListener('touchend', function(e) {
  if (!pinchState) return;
  if (e.touches.length < 2) pinchState = null;
});


function showDialog(id) { document.getElementById(id).classList.remove('hidden'); }
function closeDialog(id) {
  document.getElementById(id).classList.add('hidden');
  if (id === 'unlockDialog') { pendingDelete = null; pendingUnlock = null; resetUnlockDialog(); }
}
function welcomeSetLang(code) {
  state.lang = code;
  save();
  applyLang();
  applyTheme();
  document.documentElement.lang = code;
}
function welcomeDone() {
  state.firstVisit = false;
  save();
  closeDialog('welcomeDialog');
}
function setStatus(msg) { if (msg) console.log('[AppNotas] ' + msg); }
function showToast(msg) {
  var el = document.createElement('div');
  el.textContent = msg;
  el.style.cssText = 'position:fixed;bottom:100px;left:16px;right:16px;background:rgba(0,0,0,0.85);color:#fff;padding:14px 20px;border-radius:10px;text-align:center;z-index:9999;font-size:15px';
  document.body.appendChild(el);
  setTimeout(function() { el.remove(); }, 4000);
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme();
  save();
}
function applyTheme() {
  document.body.classList.toggle('light', state.theme === 'light');
  var logo = document.getElementById('headerLogo');
  if (logo) {
    logo.src = state.theme === 'light' ? 'Logotipo1.png' : 'Logotipo2.png';
  }
  var sidebarLogo = document.getElementById('sidebarLogo');
  if (sidebarLogo) {
    sidebarLogo.src = state.theme === 'light' ? 'Logotipo1.png' : 'Logotipo2.png';
  }
  applyLang();
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
/* Elimina caracteres inválidos para nombres de archivo */
function sanitizeFilename(name) {
  return (name || 'nota').replace(/[<>:"\/\\|?*\x00-\x1f]/g, '').trim() || 'nota';
}

function parseNoteLinks(text) {
  if (!text) return '';
  text = text.replace(/\[\(([^\]]+)\)\]/g, '<a class="note-link" data-target="$1">$1</a>');
  text = text.replace(/\[\{([^\]]+)\}\]/g, '<a class="ext-link" href="$1" target="_blank" rel="noopener">$1</a>');
  return text;
}
function unparseNoteLinks(html) {
  html = html.replace(/<a\s+class="note-link"[^>]*data-target="([^"]*)"[^>]*>[\s\S]*?<\/a>/g, '[($1)]');
  html = html.replace(/<a\s+class="ext-link"[^>]*href="([^"]*)"[^>]*>[\s\S]*?<\/a>/g, '[{$1}]');
  return html;
}
/* === LaTeX / KaTeX utility functions === */
var _latexCache = {};
function _renderLatex(latex, displayMode) {
  if (!window.katex) return '<span style="color:red;">KaTeX not loaded</span>';
  var key = displayMode + '|' + latex;
  if (_latexCache[key]) return _latexCache[key];
  try {
    var html = katex.renderToString(latex, { throwOnError: false, displayMode: displayMode, output: 'html' });
    _latexCache[key] = html;
    return html;
  } catch(e) {
    return '<span class="latex-error-msg">' + t('equationError') + '</span>';
  }
}

function renderLatexInHtml(html) {
  if (!html || html.indexOf('$') === -1) return html;
  /* Block equations $$...$$ */
  html = html.replace(/\$\$([\s\S]*?)\$\$/g, function(match, latex) {
    var trimmed = latex.trim();
    if (!trimmed) return match;
    var rendered = _renderLatex(trimmed, true);
    return '<div class="katex-block" data-latex="' + escapeHtml(trimmed) + '" contenteditable="false">' + rendered + '</div>';
  });
  /* Inline equations $...$ ($$ already replaced above) */
  html = html.replace(/\$([^\n$]+?)\$/g, function(match, latex) {
    var trimmed = latex.trim();
    if (!trimmed) return match;
    var rendered = _renderLatex(trimmed, false);
    return '<span class="katex-inline" data-latex="' + escapeHtml(trimmed) + '" contenteditable="false">' + rendered + '</span>';
  });
  return html;
}

function unrenderLatexInHtml(html) {
  if (!html) return '';
  /* Block equations: revert <div class="katex-block"...> to $$...$$ */
  html = html.replace(/<div[^>]*class="katex-block"[^>]*data-latex="([^"]*)"[^>]*>[\s\S]*?<\/div>/g, function(match, latex) {
    return '$$\n' + latex + '\n$$';
  });
  /* Inline equations: revert <span class="katex-inline"...> to $...$ */
  html = html.replace(/<span[^>]*class="katex-inline"[^>]*data-latex="([^"]*)"[^>]*>[\s\S]*?<\/span>/g, function(match, latex) {
    return '$' + latex + '$';
  });
  return html;
}

function splitTextWithLatex(text) {
  var segments = [];
  var lastIdx = 0;
  /* First find all $$...$$ blocks */
  var blockRe = /\$\$([\s\S]*?)\$\$/g;
  var allMatches = [];
  var m;
  while ((m = blockRe.exec(text)) !== null) {
    allMatches.push({ index: m.index, end: m.index + m[0].length, latex: m[1].trim(), display: true });
  }
  /* Then find $...$ that are not part of $$...$$ */
  /* Replace $$...$$ with placeholders to avoid matching $ inside them */
  var processed = text.replace(/\$\$[\s\S]*?\$\$/g, function(m) {
    return '\x00BLOCK' + allMatches.indexOf({}) + '\x00';
  });
  var inlineRe = /\$([^\n$]+?)\$/g;
  while ((m = inlineRe.exec(processed)) !== null) {
    var realIdx = findRealIndex(text, m.index, allMatches);
    allMatches.push({ index: realIdx, end: realIdx + m[0].length, latex: m[1].trim(), display: false });
  }
  /* Sort all matches by index */
  allMatches.sort(function(a, b) { return a.index - b.index; });
  /* Build segments */
  allMatches.forEach(function(match) {
    if (match.index > lastIdx) {
      segments.push({ type: 'text', content: text.substring(lastIdx, match.index) });
    }
    segments.push({ type: 'latex', content: match.latex, display: match.display });
    lastIdx = match.end;
  });
  if (lastIdx < text.length) {
    segments.push({ type: 'text', content: text.substring(lastIdx) });
  }
  return segments;
  function findRealIndex(original, processedIdx, blocks) {
    var offset = 0;
    for (var i = 0; i < blocks.length; i++) {
      var placeholderLen = 8; /* length of \x00BLOCK\x00 */
      if (blocks[i].index < processedIdx + offset) {
        offset += (blocks[i].end - blocks[i].index) - placeholderLen;
      }
    }
    return processedIdx + offset;
  }
}

function renderTextToCanvas(html, maxWidth) {
  return new Promise(function(resolve, reject) {
    try {
      var wrapper = document.createElement('div');
      wrapper.style.cssText = 'position:absolute;left:-9999px;top:0;padding:12px;background:#fff;font-size:14px;line-height:1.5;color:#000;';
      wrapper.innerHTML = html;
      document.body.appendChild(wrapper);
      var rect = wrapper.getBoundingClientRect();
      var w = Math.max(Math.ceil(Math.min(rect.width, maxWidth || 600)) + 24, 20);
      var h = Math.max(Math.ceil(rect.height) + 24, 20);
      document.body.removeChild(wrapper);

      var data = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' +
        '<foreignObject width="100%" height="100%">' +
        '<div xmlns="http://www.w3.org/1999/xhtml" style="padding:12px;background:#fff;font-size:14px;line-height:1.5;color:#000;font-family:Segoe UI,system-ui,sans-serif;overflow:hidden;">' +
        html +
        '</div></foreignObject></svg>';
      var blob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var img = new Image();
      img.onload = function() {
        var canvas = document.createElement('canvas');
        canvas.width = w * 2;
        canvas.height = h * 2;
        var ctx = canvas.getContext('2d');
        ctx.scale(2, 2);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(url);
        canvas.toBlob(function(blob) {
          if (!blob) { reject(new Error('Canvas toBlob failed')); return; }
          var reader = new FileReader();
          reader.onload = function(e) {
            var base64 = e.target.result.split(',')[1];
            resolve({ base64: base64, width: w, height: h });
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }, 'image/png');
      };
      img.onerror = function() {
        URL.revokeObjectURL(url);
        /* Fallback: draw plain text */
        var fallbackText = wrapper.textContent || 'Equation';
        var canvas = document.createElement('canvas');
        canvas.width = 400 * 2;
        canvas.height = 60 * 2;
        var ctx = canvas.getContext('2d');
        ctx.scale(2, 2);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 400, 60);
        ctx.fillStyle = '#000000';
        ctx.font = '16px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(fallbackText.substring(0, 50), 200, 30);
        canvas.toBlob(function(blob) {
          if (!blob) { reject(new Error('Canvas fallback failed')); return; }
          var reader = new FileReader();
          reader.onload = function(e) {
            var base64 = e.target.result.split(',')[1];
            resolve({ base64: base64, width: 400, height: 60 });
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }, 'image/png');
      };
      img.src = url;
    } catch(e) {
      reject(e);
    }
  });
}

function renderLatexToDataUri(latex, displayMode) {
  return new Promise(function(resolve, reject) {
    try {
      var html = katex.renderToString(latex, { throwOnError: false, displayMode: displayMode, output: 'html' });
      var wrapper = document.createElement('div');
      wrapper.style.cssText = 'position:absolute;left:-9999px;top:0;padding:12px;background:#fff;';
      wrapper.innerHTML = html;
      document.body.appendChild(wrapper);
      var rect = wrapper.getBoundingClientRect();
      var w = Math.max(Math.ceil(rect.width) + 24, 20);
      var h = Math.max(Math.ceil(rect.height) + 24, 20);
      var canvas = document.createElement('canvas');
      canvas.width = w * 2;
      canvas.height = h * 2;
      var ctx = canvas.getContext('2d');
      ctx.scale(2, 2);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);
      /* Draw KaTeX HTML by serializing the wrapper */
      var data = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' +
        '<foreignObject width="100%" height="100%">' +
        '<div xmlns="http://www.w3.org/1999/xhtml" style="padding:12px;background:#fff;font-size:16px;">' +
        wrapper.innerHTML +
        '</div></foreignObject></svg>';
      var blob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var img = new Image();
      img.onload = function() {
        ctx.drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(url);
        document.body.removeChild(wrapper);
        canvas.toBlob(function(blob) {
          if (!blob) { reject(new Error('Canvas toBlob failed')); return; }
          var reader = new FileReader();
          reader.onload = function(e) {
            var base64 = e.target.result.split(',')[1];
            resolve({ dataUri: 'data:image/png;base64,' + base64, width: w, height: h });
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }, 'image/png');
      };
      img.onerror = function() {
        /* Fallback: draw text directly */
        ctx.font = displayMode ? '22px serif' : '16px serif';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(latex, w / 2, h / 2);
        document.body.removeChild(wrapper);
        URL.revokeObjectURL(url);
        canvas.toBlob(function(blob) {
          if (!blob) { reject(new Error('Canvas fallback failed')); return; }
          var reader = new FileReader();
          reader.onload = function(e) {
            var base64 = e.target.result.split(',')[1];
            resolve({ dataUri: 'data:image/png;base64,' + base64, width: w, height: h });
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }, 'image/png');
      };
      img.src = url;
    } catch(e) {
      reject(e);
    }
  });
}

function openLatexEditor(noteId, itemId, latex, isBlock) {
  var overlay = document.createElement('div');
  overlay.className = 'dialog-overlay';
  overlay.style.display = 'flex';
  overlay.innerHTML =
    '<div class="dialog" style="min-width:400px;max-width:600px;">' +
    '<h3>' + t('equationEditor') + '</h3>' +
    '<div class="field"><label>' + t('equationPlaceholder') + '</label>' +
    '<textarea id="eqEditorInput" spellcheck="false">' + escapeHtml(latex || '') + '</textarea></div>' +
    '<div class="field"><label>' + t('latexPreview') + '</label>' +
    '<div id="eqEditorPreview">' + (latex ? _renderLatex(latex, isBlock) : '') + '</div></div>' +
    '<div id="eqEditorError"></div>' +
    '<div class="dialog-actions">' +
    '<button class="btn" id="eqEditorCancelBtn">' + t('cancel') + '</button>' +
    '<button class="btn btn-primary" id="eqEditorSaveBtn">' + t('save') + '</button></div></div>';
  document.body.appendChild(overlay);

  var input = document.getElementById('eqEditorInput');
  var preview = document.getElementById('eqEditorPreview');
  var error = document.getElementById('eqEditorError');
  var isBlockEq = isBlock !== false;

  function updatePreview() {
    var val = input.value.trim();
    if (!val) { preview.innerHTML = ''; error.textContent = ''; return; }
    try {
      var rendered = katex.renderToString(val, { throwOnError: false, displayMode: isBlockEq });
      preview.innerHTML = rendered;
      error.textContent = '';
    } catch(e) {
      error.textContent = t('equationError');
    }
  }

  input.addEventListener('input', updatePreview);
  document.getElementById('eqEditorCancelBtn').addEventListener('click', function() {
    document.body.removeChild(overlay);
  });
  document.getElementById('eqEditorSaveBtn').addEventListener('click', function() {
    var newLatex = input.value.trim();
    if (noteId && itemId) {
      var note = state.notes.find(function(n) { return n.id === noteId; });
      if (note) {
        var item = note.items.find(function(i) { return i.id === itemId; });
        if (item) {
          var pattern = isBlockEq ? /(\$\$[\s\S]*?\$\$)/ : /\$[^\n$]+?\$/;
          var existing = item.text || '';
          /* Replace the first matching LaTeX block in the item text */
          var replaced = false;
          var newText = existing.replace(pattern, function(match) {
            if (!replaced) { replaced = true; return isBlockEq ? '$$\n' + newLatex + '\n$$' : '$' + newLatex + '$'; }
            return match;
          });
          if (replaced) item.text = newText;
          else item.text = existing + (isBlockEq ? '\n$$\n' + newLatex + '\n$$\n' : ' $' + newLatex + '$ ');
          save();
          renderNoteContent();
        }
      }
    }
    document.body.removeChild(overlay);
  });
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) document.body.removeChild(overlay);
  });
  setTimeout(function() { input.focus(); }, 100);
}

function insertLatexBlock() {
  var noteId = state.activeNoteId;
  if (!noteId) return;
  var el = document.querySelector('.list-item[data-id="' + activeItemId + '"] .item-text[contenteditable]');
  if (!el) return;
  var sel = window.getSelection();
  var range = sel.getRangeAt(0);
  var before = range.startContainer.textContent.substring(0, range.startOffset);
  var after = range.startContainer.textContent.substring(range.startOffset);
  var latexCode = '\n$$\n\n$$\n';
  var textNode = document.createTextNode(latexCode);
  range.insertNode(textNode);
  range.setStart(textNode, 3);
  range.setEnd(textNode, 3);
  sel.removeAllRanges();
  sel.addRange(range);
  el.focus();
  updateItemText(noteId, activeItemId, el.innerHTML);
}

function navigateToNoteLink(target) {
  var note = state.notes.find(function(n) { return n.title.toLowerCase() === target.toLowerCase(); });
  if (note) { state.view = 'notes'; state.activeBoardId = null; selectNote(note.id); return; }
  var board = state.boards.find(function(b) { return b.name.toLowerCase() === target.toLowerCase(); });
  if (board) { state.view = 'board'; state.activeNoteId = null; selectBoard(board.id); return; }
  alert('Nota/tablero "' + target + '" no encontrado');
}

function updateBackBtn() {
  var btn = document.getElementById('headerBackBtn');
  var studyBtn = document.getElementById('headerStudyBtn');
  var titleEl = document.getElementById('headerCenteredTitle');
  if (!btn) return;
  if (state.view === 'notes') {
    btn.classList.toggle('hidden', !state.activeNoteId);
    if (studyBtn) studyBtn.classList.add('hidden');
    if (titleEl) {
      if (state.activeNoteId) {
        var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
        if (note) { titleEl.textContent = note.title; titleEl.classList.remove('hidden'); }
        else titleEl.classList.add('hidden');
      } else titleEl.classList.add('hidden');
    }
  }
  else if (state.view === 'board') {
    btn.classList.toggle('hidden', !state.activeBoardId);
    if (studyBtn) studyBtn.classList.add('hidden');
    if (titleEl) {
      if (state.activeBoardId) {
        var board = state.boards.find(function(b) { return b.id === state.activeBoardId; });
        if (board) { titleEl.textContent = board.name; titleEl.classList.remove('hidden'); }
        else titleEl.classList.add('hidden');
      } else titleEl.classList.add('hidden');
    }
  }
  else if (state.view === 'diary') {
    btn.classList.toggle('hidden', !state.activeNoteId);
    if (studyBtn) studyBtn.classList.add('hidden');
    if (titleEl) {
      if (state.activeNoteId) {
        var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
        if (note) { titleEl.textContent = note.title; titleEl.classList.remove('hidden'); }
        else titleEl.classList.add('hidden');
      } else { titleEl.textContent = t('diary'); titleEl.classList.remove('hidden'); }
    }
  }
  else if (state.view === 'study') {
    btn.classList.toggle('hidden', !state.activeStudySetId || window._studyingSetId === state.activeStudySetId);
    if (titleEl) {
      if (state.activeStudySetId && window._studyingSetId !== state.activeStudySetId) {
        var set = state.studySets.find(function(s) { return s.id === state.activeStudySetId; });
        if (set) { titleEl.textContent = set.name; titleEl.classList.remove('hidden'); }
        else titleEl.classList.add('hidden');
      } else titleEl.classList.add('hidden');
    }
    if (studyBtn) {
      studyBtn.classList.toggle('hidden', !state.activeStudySetId);
      if (state.activeStudySetId) {
        var set = state.studySets.find(function(s) { return s.id === state.activeStudySetId; });
        studyBtn.classList.toggle('hidden', !set || !set.cards || set.cards.length === 0 || window._studyingSetId === set.id);
      }
    }
  } else if (state.view === 'cafecito') {
    btn.classList.add('hidden');
    if (studyBtn) studyBtn.classList.add('hidden');
    if (titleEl) { titleEl.textContent = 'Expandir la Biblioteca'; titleEl.classList.remove('hidden'); }
  } else {
    btn.classList.add('hidden');
    if (studyBtn) studyBtn.classList.add('hidden');
    if (titleEl) titleEl.classList.add('hidden');
  }
  var sl = document.getElementById('studyBtnLabel');
  if (sl) sl.textContent = t('study');
  var compact = (state.view === 'notes' && state.activeNoteId) ||
                (state.view === 'board' && state.activeBoardId) ||
                (state.view === 'diary' && state.activeNoteId) ||
                (state.view === 'study' && state.activeStudySetId);
  var trigger = document.querySelector('.menu-trigger');
  if (trigger) trigger.classList.toggle('compact', compact);
}

function clearCurrentUnlock() {
  if (state.activeNoteId) delete unlockedIds['n' + state.activeNoteId];
  if (state.activeBoardId) delete unlockedIds['b' + state.activeBoardId];
}
function goBack() {
  clearCurrentUnlock();
  _activeTableId = null; _tableSelection.itemId = null; _tableSelection.cells = [];
  if (state.view === 'board') state.activeBoardId = null;
  else if (state.view === 'diary') { state.activeNoteId = null; }
  else if (state.view === 'study') { state.activeStudySetId = null; }
  else state.activeNoteId = null;
  save();
  renderAll();
}
function backToNotes() { clearCurrentUnlock(); state.activeNoteId = null; save(); renderAll(); }
function backToBoards() { clearCurrentUnlock(); state.activeBoardId = null; save(); renderAll(); }

function todayDateStr() { var d = new Date(); return d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear(); }

function getOrCreateDiaryNote() {
  var dateStr = todayDateStr();
  var note = state.notes.find(function(n) { return n.diary && n.title === dateStr; });
  if (!note) {
    note = { id: genId(), title: dateStr, items: [], pwdHash: '', diary: true };
    state.notes.push(note);
    save();
  }
  return note;
}
function openTodayDiary() {
  if (!diaryUnlockFlow()) return;
  var note = getOrCreateDiaryNote();
  state.activeNoteId = note.id;
  state.view = 'diary';
  save();
  renderAll();
}

function hashPwd(s) {
  if (!s) return '';
  var h = 0;
  for (var i = 0; i < s.length; i++) { h = ((h << 5) - h) + s.charCodeAt(i); h = h & h; }
  return 'h' + Math.abs(h).toString(36);
}

var unlockedIds = {};

function showNewNoteDialog() {
  document.getElementById('newNotePwd').value = '';
  showDialog('newNoteDialog');
  setTimeout(function(){ document.getElementById('newNoteTitle').focus(); }, 100);
}

var _coverNoteId = null;
function triggerImportCover(noteId) {
  _coverNoteId = noteId || state.activeNoteId;
  document.getElementById('coverInput').value = '';
  document.getElementById('coverInput').click();
}
function importCover(input) {
  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  if (file.size > 5 * 1024 * 1024) { alert(t('coverTooLarge')); return; }
  var reader = new FileReader();
  reader.onload = function(e) {
    var note = state.notes.find(function(n) { return n.id === _coverNoteId; });
    if (!note) return;
    note.cover = e.target.result;
    save();
    renderAll();
    selectNote(_coverNoteId);
  };
  reader.readAsDataURL(file);
}
function removeCover(noteId) {
  var id = noteId || state.activeNoteId;
  var note = state.notes.find(function(n) { return n.id === id; });
  if (!note) return;
  note.cover = '';
  save();
  renderAll();
  if (state.activeNoteId) selectNote(state.activeNoteId);
}
var _imageTargetEl = null;
function triggerInsertImage(postitId) {
  var el = null;
  if (postitId) {
    var postit = document.querySelector('.postit[data-id="' + postitId + '"]');
    if (postit) el = postit.querySelector('.postit-text');
  } else {
    el = document.activeElement;
    if (!el || !el.isContentEditable) {
      if (activeItemId) {
        var noteEl = document.querySelector('.list-item[data-id="' + activeItemId + '"] .item-text[contenteditable]');
        if (noteEl) el = noteEl;
      }
    }
  }
  _imageTargetEl = el;
  document.getElementById('imageInput').value = '';
  document.getElementById('imageInput').click();
}
function insertImage(input) {
  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  if (file.size > 5 * 1024 * 1024) { alert('Image too large. Max 5MB.'); return; }
  _imageTargetEl = null;
  var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
  if (!note) return;
  var idx = -1;
  if (activeItemId !== null) {
    note.items.forEach(function(it, i) { if (it.id === activeItemId) idx = i; });
  }
  setStatus('Convirtiendo imagen...');
  ImageConverter.toWebP(file, 0.85).then(function(result) {
    var uuid = generateImageId();
    var ref = 'imagenes/' + uuid + '.webp';
    return ImageManager.save(ref, result.base64).then(function() {
      addImageItem(note.id, idx, ref, result.width, result.height, '');
      setStatus('');
    });
  }).catch(function(err) {
    console.error('Error inserting image:', err);
    setStatus('Error al insertar imagen');
  });
}

function createNote() {
  var title = document.getElementById('newNoteTitle').value.trim() || t('newNoteLabel');
  var pwd = document.getElementById('newNotePwd').value;
  var note = { id: genId(), title: title, items: [], pwdHash: hashPwd(pwd), cover: '', createdAt: Date.now() };
  state.notes.push(note);
  state.activeNoteId = note.id;
  if (pwd) unlockedIds['n' + note.id] = true;
  closeDialog('newNoteDialog');
  document.getElementById('newNoteTitle').value = '';
  document.getElementById('newNotePwd').value = '';
  save();
  checkMilestones();
  renderAll();
}

var pendingUnlock = null;
var pendingDelete = null;

function selectNote(id) {
  _activeTableId = null; _tableSelection.itemId = null; _tableSelection.cells = [];
  if (preventCardClick) { preventCardClick = false; return; }
  var note = state.notes.find(function(n) { return n.id === id; });
  if (!note) return;
  if (note.diary && !diaryUnlockFlow()) return;
  if (note.pwdHash && !unlockedIds['n' + id]) {
    pendingUnlock = { type: 'note', id: id };
    document.getElementById('unlockPwdInput').value = '';
    document.getElementById('unlockTitle').textContent = t('protectedNote') + note.title;
    showDialog('unlockDialog');
    setTimeout(function(){ document.getElementById('unlockPwdInput').focus(); }, 100);
    return;
  }
  state.activeNoteId = id;
  save();
  renderAll();
}

function selectBoard(id) {
  _activeTableId = null; _tableSelection.itemId = null; _tableSelection.cells = [];
  var board = state.boards.find(function(b) { return b.id === id; });
  if (!board) return;
  if (board.pwdHash && !unlockedIds['b' + id]) {
    pendingUnlock = { type: 'board', id: id };
    document.getElementById('unlockPwdInput').value = '';
    document.getElementById('unlockTitle').textContent = t('protectedBoard') + board.name;
    showDialog('unlockDialog');
    setTimeout(function(){ document.getElementById('unlockPwdInput').focus(); }, 100);
    return;
  }
  state.activeBoardId = id;
  save();
  renderAll();
}

function resetUnlockDialog() {
  document.getElementById('unlockPwdInput').style.display = '';
  document.getElementById('unlockMsg').style.display = 'none';
  document.getElementById('unlockConfirmBtn').textContent = t('confirm');
}

function unlockItem() {
  var pwd = document.getElementById('unlockPwdInput').value;
  if (pendingDelete) {
    if (pendingDelete.type === 'fav-warning') {
      closeDialog('unlockDialog');
      pendingDelete = null;
      resetUnlockDialog();
      return;
    }
    var item = pendingDelete.type === 'note'
      ? state.notes.find(function(n) { return n.id === pendingDelete.id; })
      : state.boards.find(function(b) { return b.id === pendingDelete.id; });
    if (!item || hashPwd(pwd) !== item.pwdHash) {
      setStatus(t('wrongPassword'));
      document.getElementById('unlockPwdInput').value = '';
      document.getElementById('unlockPwdInput').focus();
      return;
    }
    var _pd = pendingDelete;
    closeDialog('unlockDialog');
    if (_pd.type === 'note') deleteNote(_pd.id);
    else deleteBoard(_pd.id);
    pendingDelete = null;
    return;
  }
  if (!pendingUnlock) return;
  if (pendingUnlock.type === 'diary') {
    if (hashPwd(pwd) !== state.diaryPwdHash) {
      setStatus('Contrasena incorrecta');
      document.getElementById('unlockPwdInput').value = '';
      document.getElementById('unlockPwdInput').focus();
      return;
    }
    diaryUnlocked = true;
    closeDialog('unlockDialog');
    pendingUnlock = null;
    switchView('diary');
    return;
  }
  var item = pendingUnlock.type === 'note'
    ? state.notes.find(function(n) { return n.id === pendingUnlock.id; })
    : state.boards.find(function(b) { return b.id === pendingUnlock.id; });
  if (!item || hashPwd(pwd) !== item.pwdHash) {
    setStatus('Contrasena incorrecta');
    document.getElementById('unlockPwdInput').value = '';
    document.getElementById('unlockPwdInput').focus();
    return;
  }
  var key = (pendingUnlock.type === 'note' ? 'n' : 'b') + pendingUnlock.id;
  unlockedIds[key] = true;
  if (pendingUnlock.type === 'note') state.activeNoteId = pendingUnlock.id;
  else state.activeBoardId = pendingUnlock.id;
  closeDialog('unlockDialog');
  pendingUnlock = null;
  save();
  renderAll();
}

function confirmDeleteNote(id) {
  var note = state.notes.find(function(n) { return n.id === id; });
  if (!note) return;
  if (note.favorite) {
    document.getElementById('unlockTitle').textContent = t('noteInFavorites');
    document.getElementById('unlockMsg').textContent = t('unfavoriteToDelete');
    document.getElementById('unlockMsg').style.display = '';
    document.getElementById('unlockPwdInput').style.display = 'none';
    document.getElementById('unlockConfirmBtn').textContent = t('understood');
    pendingUnlock = null; pendingDelete = { type: 'fav-warning' };
    showDialog('unlockDialog');
    return;
  }
  if (note.pwdHash && !unlockedIds['n' + id]) {
    pendingUnlock = null; pendingDelete = { type: 'note', id: id };
    document.getElementById('unlockPwdInput').value = '';
    document.getElementById('unlockTitle').textContent = t('deleteNote') + note.title;
    document.getElementById('unlockPwdInput').style.display = '';
    document.getElementById('unlockConfirmBtn').textContent = 'Confirmar';
    document.getElementById('unlockMsg').style.display = 'none';
    showDialog('unlockDialog');
    setTimeout(function(){ document.getElementById('unlockPwdInput').focus(); }, 100);
    return;
  }
  deleteNote(id);
}

function confirmDeleteBoard(id) {
  var board = state.boards.find(function(b) { return b.id === id; });
  if (!board) return;
  if (board.pwdHash && !unlockedIds['b' + id]) {
    pendingUnlock = null; pendingDelete = { type: 'board', id: id };
    document.getElementById('unlockPwdInput').value = '';
    document.getElementById('unlockPwdInput').style.display = '';
    document.getElementById('unlockConfirmBtn').textContent = 'Confirmar';
    document.getElementById('unlockMsg').style.display = 'none';
    document.getElementById('unlockTitle').textContent = t('deleteBoard') + board.name;
    showDialog('unlockDialog');
    setTimeout(function(){ document.getElementById('unlockPwdInput').focus(); }, 100);
    return;
  }
  deleteBoard(id);
}

function deleteNote(id) {
  var note = state.notes.find(function(n) { return n.id === id; });
  if (!note) return;
  cancelNoteNotifications(id);
  state.trash.push({ type: 'note', data: note, deletedAt: Date.now() });
  state.notes = state.notes.filter(function(n) { return n.id !== id; });
  if (state.activeNoteId === id) state.activeNoteId = state.notes.length > 0 ? state.notes[0].id : null;
  save();
  renderAll();
}
function deleteBoard(id) {
  var board = state.boards.find(function(b) { return b.id === id; });
  if (!board) return;
  state.trash.push({ type: 'board', data: board, deletedAt: Date.now() });
  state.boards = state.boards.filter(function(b) { return b.id !== id; });
  if (state.activeBoardId === id) state.activeBoardId = state.boards.length > 0 ? state.boards[0].id : null;
  save();
  renderAll();
}
function deleteStudySet(id) {
  var set = state.studySets.find(function(s) { return s.id === id; });
  if (!set) return;
  state.trash.push({ type: 'studySet', data: set, deletedAt: Date.now() });
  state.studySets = state.studySets.filter(function(s) { return s.id !== id; });
  if (state.activeStudySetId === id) state.activeStudySetId = null;
  save();
  renderAll();
}
function restoreFromTrash(index) {
  var item = state.trash[index];
  if (!item) return;
  if (item.type === 'note') state.notes.push(item.data);
  else if (item.type === 'board') state.boards.push(item.data);
  else if (item.type === 'studySet') state.studySets.push(item.data);
  state.trash.splice(index, 1);
  save();
  renderAll();
}
function deleteFromTrashPermanently(index) {
  var removed = state.trash[index];
  state.trash.splice(index, 1);
  save();
  renderAll();
  if (!removed || !removed.data) return;
  var refsToDelete = [];
  if (removed.type === 'note' && removed.data.items) {
    removed.data.items.forEach(function(item) {
      if ((item.type === 'image' || item.type === 'audio' || item.type === 'video') && item.src) {
        refsToDelete.push(item.src);
      }
    });
  } else if (removed.type === 'board' && removed.data.elements) {
    removed.data.elements.forEach(function(el) {
      if (el.ref) refsToDelete.push(el.ref);
    });
  }
  if (refsToDelete.length === 0) return;
  var activeRefs = ImageManager.collectUsedRefs ? ImageManager.collectUsedRefs() : [];
  refsToDelete.forEach(function(ref) {
    if (activeRefs.indexOf(ref) === -1) {
      ImageManager.delete(ref).catch(function(err) {
        console.warn('Error deleting orphan media:', ref, err);
      });
    }
  });
}
function cleanupTrash() {
  var cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
  state.trash = state.trash.filter(function(item) { return item.deletedAt > cutoff; });
}

function addItem(type, afterIndex, level) {
  var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
  if (!note) return;
  var newItem = { id: genId(), text: '', checked: false, level: level || 0, type: type || 'list' };
  if (afterIndex !== undefined && afterIndex >= 0) {
    note.items.splice(afterIndex + 1, 0, newItem);
  } else if (activeItemId !== null) {
    var idx = -1;
    note.items.forEach(function(it, i) { if (it.id === activeItemId) idx = i; });
    if (idx >= 0) {
      note.items.splice(idx + 1, 0, newItem);
    } else {
      note.items.push(newItem);
    }
  } else {
    note.items.push(newItem);
  }
  save();
  renderNoteContent();
  var idx = note.items.indexOf(newItem);
  var items = document.querySelectorAll('.list-item .item-text[contenteditable]');
  if (items.length > idx && idx >= 0) { items[idx].focus(); placeCaretAtEnd(items[idx]); }
}
function addTextItem() { addItem('text'); }

/* Inserta un item de tipo imagen en la nota activa */
function addImageItem(noteId, afterIndex, src, width, height, caption) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  var newItem = { id: genId(), type: 'image', src: src, width: width || 0, height: height || 0, caption: caption || '' };
  if (afterIndex !== undefined && afterIndex >= 0) {
    note.items.splice(afterIndex + 1, 0, newItem);
  } else {
    note.items.push(newItem);
  }
  save();
  renderNoteContent();
}

/* Actualiza el caption de un item imagen */
function updateImageCaption(noteId, itemId, html) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  var item = note.items.find(function(i) { return i.id === itemId; });
  if (item) { item.caption = html || ''; save(); }
}

/* Carga las imágenes desde el sistema de archivos después del render */
function loadNoteImages() {
  var imgs = document.querySelectorAll('.image-item img[data-ref]');
  [].forEach.call(imgs, function(img) {
    var ref = img.getAttribute('data-ref');
    if (!ref) return;
    img.removeAttribute('data-ref');
    img.classList.add('image-loading');
    ImageManager.read(ref).then(function(base64) {
      img.classList.remove('image-loading');
      if (base64) {
        var mime = ImageConverter.getMimeFromRef(ref);
        img.src = 'data:' + mime + ';base64,' + base64;
      } else {
        img.alt = 'Imagen no encontrada';
        img.classList.add('image-missing');
      }
    }).catch(function(err) {
      img.classList.remove('image-loading');
      img.alt = 'Error al cargar';
      img.classList.add('image-missing');
      console.error('Error loading image:', ref, err);
    });
  });
}

var _tableSelection = { itemId: null, cells: [] };
var _activeTableId = null;
var _isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
var _tableLongPressTimer = null;
var _skipNextTableMouseDown = false;

// Desktop: click table cell to set single selection
document.addEventListener('mousedown', function(e) {
  var td = e.target.closest('.note-table td');
  if (!td || _skipNextTableMouseDown) { _skipNextTableMouseDown = false; return; }
  var tableId = Number(td.dataset.tableId);
  var idx = Number(td.dataset.idx);
  _activeTableId = tableId;
  if (e.ctrlKey || e.metaKey) {
    if (_tableSelection.itemId !== tableId) { _tableSelection.itemId = tableId; _tableSelection.cells = []; }
    var pos = _tableSelection.cells.indexOf(idx);
    if (pos >= 0) _tableSelection.cells.splice(pos, 1);
    else _tableSelection.cells.push(idx);
    renderNoteContent();
  } else {
    _tableSelection.itemId = tableId; _tableSelection.cells = [idx];
  }
});

// Prevent fmt-bar buttons from stealing focus / losing text selection
document.addEventListener('mousedown', function(e) {
  if (!e.target.closest('.fmt-bar')) return;
  if (e.target.closest('button') || e.target.closest('.hl-color')) e.preventDefault();
}, true);

// Mobile: long-press to toggle table cell selection
if (_isTouchDevice) {
  document.addEventListener('touchstart', function(e) {
    var td = e.target.closest('.note-table td');
    if (!td) return;
    if (e.target.closest('button, .item-actions')) return;
    var tableId = Number(td.dataset.tableId);
    var idx = Number(td.dataset.idx);
    _skipNextTableMouseDown = true;
    _tableLongPressTimer = setTimeout(function() {
      _tableLongPressTimer = null;
      _activeTableId = tableId;
      if (_tableSelection.itemId !== tableId) { _tableSelection.itemId = tableId; _tableSelection.cells = []; }
      var pos = _tableSelection.cells.indexOf(idx);
      if (pos >= 0) _tableSelection.cells.splice(pos, 1);
      else _tableSelection.cells.push(idx);
      renderNoteContent();
    }, 500);
  }, { passive: true });
  document.addEventListener('touchmove', function(e) {
    if (_tableLongPressTimer) { clearTimeout(_tableLongPressTimer); _tableLongPressTimer = null; }
  }, { passive: true });
  document.addEventListener('touchend', function(e) {
    if (_tableLongPressTimer) { clearTimeout(_tableLongPressTimer); _tableLongPressTimer = null; }
    _skipNextTableMouseDown = false;
  }, { passive: true });
}

function showTableDialog() {
  document.getElementById('tableRows').value = 3;
  document.getElementById('tableCols').value = 3;
  showDialog('tableDialog');
  setTimeout(function(){ document.getElementById('tableRows').focus(); }, 100);
}
function createTable() {
  var rows = parseInt(document.getElementById('tableRows').value) || 3;
  var cols = parseInt(document.getElementById('tableCols').value) || 3;
  if (rows < 1) rows = 1; if (cols < 1) cols = 1;
  if (rows > 20) rows = 20; if (cols > 20) cols = 20;
  var cells = [];
  for (var i = 0; i < rows * cols; i++) cells.push({ text: '', rowspan: 1, colspan: 1 });
  var item = { id: genId(), type: 'table', rows: rows, cols: cols, cells: cells };
  var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
  if (!note) return;
  note.items.push(item);
  save();
  closeDialog('tableDialog');
  renderNoteContent();
}
function renderTableData(item, noteId) {
  var R = item.rows, C = item.cols, cells = item.cells;
  if (!cells || cells.length === 0) return '<div style="color:var(--text-muted);padding:8px;">Empty table</div>';
  var html = '<div class="note-table-wrap"' + (item.align ? ' style="text-align:' + item.align + ';"' : '') + '><table class="note-table" data-table-id="' + item.id + '">';
  var idx = 0;
  for (var r = 0; r < R; r++) {
    html += '<tr>';
    for (var c = 0; c < C; c++) {
      var cell = cells[idx]; idx++;
      if (!cell) continue;
      var nid = noteId || 'null';
      var classes = [];
      if (_tableSelection.itemId === item.id && _tableSelection.cells.indexOf(idx - 1) >= 0) classes.push('selected');
      html += '<td contenteditable="true" class="' + classes.join(' ') + '" data-r="' + r + '" data-c="' + c + '" data-table-id="' + item.id + '" data-idx="' + (idx - 1) + '" oninput="updateTableText(' + nid + ',' + item.id + ',' + (idx-1) + ',this.innerHTML)"';
      if (cell.colspan > 1) html += ' colspan="' + cell.colspan + '"';
      if (cell.rowspan > 1) html += ' rowspan="' + cell.rowspan + '"';
      html += '>' + (cell.text || '') + '</td>';
    }
    html += '</tr>';
  }
  html += '</table></div>';
  return html;
}
function updateTableText(noteId, itemId, idx, html) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  var item = note.items.find(function(i) { return i.id === itemId; });
  if (item && item.cells && item.cells[idx]) { item.cells[idx].text = html || ''; save(); }
}
function mergeSelectedCells(noteId, itemId) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  var item = note.items.find(function(i) { return i.id === itemId; });
  if (!item || !item.cells || _tableSelection.cells.length < 2) return;
  var C = item.cols;
  var indices = _tableSelection.cells.slice().sort(function(a,b){return a-b;});
  var rows = indices.map(function(idx){ return Math.floor(idx / C); });
  var cols = indices.map(function(idx){ return idx % C; });
  var r1 = Math.min.apply(null, rows), r2 = Math.max.apply(null, rows);
  var c1 = Math.min.apply(null, cols), c2 = Math.max.apply(null, cols);
  var newRowspan = r2 - r1 + 1, newColspan = c2 - c1 + 1;
  var mergedText = '';
  indices.forEach(function(idx) {
    if (item.cells[idx]) { mergedText += (mergedText ? ' ' : '') + (item.cells[idx].text || ''); }
  });
  for (var r = r1; r <= r2; r++) {
    for (var c = c1; c <= c2; c++) {
      var idx2 = r * C + c;
      if (r === r1 && c === c1) { item.cells[idx2] = { text: mergedText, rowspan: newRowspan, colspan: newColspan }; }
      else { item.cells[idx2] = null; }
    }
  }
  _tableSelection.itemId = null; _tableSelection.cells = []; _activeTableId = null;
  save(); renderNoteContent();
}
function splitTableCells(noteId, itemId) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  var item = note.items.find(function(i) { return i.id === itemId; });
  if (!item || !item.cells || _tableSelection.cells.length !== 1) return;
  var idx = _tableSelection.cells[0];
  var cell = item.cells[idx];
  if (!cell || (cell.rowspan === 1 && cell.colspan === 1)) return;
  var C = item.cols;
  var r = Math.floor(idx / C), c = idx % C;
  var rs = cell.rowspan, cs = cell.colspan;
  var text = cell.text || '';
  for (var rr = r; rr < r + rs; rr++) {
    for (var cc = c; cc < c + cs; cc++) {
      var idx2 = rr * C + cc;
      if (rr === r && cc === c) { item.cells[idx2] = { text: text, rowspan: 1, colspan: 1 }; }
      else { item.cells[idx2] = { text: '', rowspan: 1, colspan: 1 }; }
    }
  }
  _tableSelection.itemId = null; _tableSelection.cells = [];
  save(); renderNoteContent();
}

function deleteItem(noteId, itemId) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  var removed = null;
  note.items = note.items.filter(function(i) {
    if (i.id === itemId && (i.type === 'image' || i.type === 'audio' || i.type === 'video')) removed = i;
    return i.id !== itemId;
  });
  save();
  renderNoteContent();
  if (removed && (removed.src || removed.ref)) {
    var ref = removed.src || removed.ref;
    var stillUsed = false;
    function checkItems(items) {
      items.forEach(function(it) {
        var r = it.src || it.ref;
        if (r === ref) stillUsed = true;
      });
    }
    state.notes.forEach(function(n) { checkItems(n.items); });
    state.trash.forEach(function(t) {
      if (t.type === 'note' && t.data) checkItems(t.data.items || []);
    });
    if (!stillUsed) {
      if (_mediaBlobUrls[ref]) {
        URL.revokeObjectURL(_mediaBlobUrls[ref]);
        delete _mediaBlobUrls[ref];
      }
      ImageManager.delete(ref).catch(function(err) {
        console.warn('Error deleting orphan media:', ref, err);
      });
    }
  }
}

function toggleItem(noteId, itemId) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  var item = note.items.find(function(i) { return i.id === itemId; });
  if (item) { item.checked = !item.checked; save(); renderNoteContent(); }
}

function updateItemText(noteId, itemId, html) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  var item = note.items.find(function(i) { return i.id === itemId; });
  if (item) { item.text = unparseNoteLinks(unrenderLatexInHtml(html || '')); save(); }
}
function computeOnEquals(el, noteId, itemId) {
  var text = el.textContent;
  if (!text.endsWith('=')) return;
  var expr = text.slice(0, -1).trim();
  if (!expr) return;
  var sanitized = expr.replace(/[^0-9+\-*/.%\^()\s]/g, '').replace(/\^/g, '**');
  if (!sanitized) return;
  try {
    var result = Function('return (' + sanitized + ')')();
    if (typeof result !== 'number' || !isFinite(result)) return;
    var textNode = document.createTextNode(String(Number.isInteger(result) ? result : parseFloat(result.toFixed(4))));
    el.appendChild(textNode);
    var sel = window.getSelection();
    var range = document.createRange();
    range.setStartAfter(textNode); range.collapse(true);
    sel.removeAllRanges(); sel.addRange(range);
    updateItemText(noteId, itemId, el.innerHTML);
  } catch(e) {}
}

var activeItemId = null;

function formatBold() { document.execCommand('bold'); updateFmtBar(); saveActiveItem(); }
function formatItalic() { document.execCommand('italic'); updateFmtBar(); saveActiveItem(); }
function formatUnderline() { document.execCommand('underline'); updateFmtBar(); saveActiveItem(); }
function formatBulletList() { document.execCommand('insertUnorderedList'); saveActiveItem(); }
function formatNumberedList() { document.execCommand('insertOrderedList'); saveActiveItem(); }
var _alignCycle = ['left', 'center', 'right', 'justify'];
var _alignCycleIdx = 0;
function cycleAlignment() {
  var align = _alignCycle[_alignCycleIdx];
  _alignCycleIdx = (_alignCycleIdx + 1) % 4;
  var cmds = { left: 'justifyLeft', center: 'justifyCenter', right: 'justifyRight', justify: 'justifyFull' };
  var icons = { left: '\u2190', center: '\u2194', right: '\u2192', justify: '\u21C4' };
  var activeEl = document.activeElement;
  var inTableCell = activeEl && activeEl.closest('.note-table td');
  if (!inTableCell && _activeTableId && _tableSelection.itemId) {
    var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
    if (note) {
      var item = note.items.find(function(i) { return i.id === _tableSelection.itemId; });
      if (item && item.type === 'table') {
        if (align === 'left') delete item.align;
        else item.align = align;
        save(); renderNoteContent();
        var btn = document.querySelector('.fmt-align-btn');
        if (btn) btn.textContent = icons[align];
        return;
      }
    }
  }
  document.execCommand(cmds[align] || 'justifyLeft');
  saveActiveItem();
  var btn = document.querySelector('.fmt-align-btn');
  if (btn) btn.textContent = icons[align];
}
var _hlColor = '#ffff00';
function selectHighlightColor(color) {
  _hlColor = color;
  document.getElementById('hlPalette').classList.add('hidden');
  var span = document.querySelector('.hl-toggle span');
  if (span) span.style.background = color;
}
function selectRemoveHighlight() {
  _hlColor = 'transparent';
  document.getElementById('hlPalette').classList.add('hidden');
  var span = document.querySelector('.hl-toggle span');
  if (span) span.style.background = 'transparent';
}
function applyHighlight() {
  document.execCommand('hiliteColor', false, _hlColor);
  saveActiveItem();
}
function toggleHighlightPalette() {
  var palette = document.getElementById('hlPalette');
  if (!palette) return;
  if (palette.classList.contains('hidden')) {
    var btn = document.querySelector('.hl-toggle');
    if (btn) {
      var r = btn.getBoundingClientRect();
      palette.style.left = r.left + 'px';
      palette.style.bottom = (window.innerHeight - r.top + 4) + 'px';
      palette.style.top = 'auto';
      palette.classList.remove('hidden');
      var ph = palette.offsetHeight;
      if (r.top < ph + 4) {
        if (window.innerHeight - r.bottom > ph + 4) {
          palette.style.bottom = 'auto';
          palette.style.top = (r.bottom + 4) + 'px';
        } else {
          palette.style.top = '4px';
          palette.style.bottom = 'auto';
        }
      }
    } else {
      palette.classList.remove('hidden');
    }
  } else {
    palette.classList.add('hidden');
  }
}

function updateFmtBar() {
  var b = document.getElementById('fmtBold');
  var i = document.getElementById('fmtItalic');
  var u = document.getElementById('fmtUnderline');
  if (b) b.classList.toggle('active', document.queryCommandState('bold'));
  if (i) i.classList.toggle('active', document.queryCommandState('italic'));
  if (u) u.classList.toggle('active', document.queryCommandState('underline'));
}

function saveActiveItem() {
  if (activeItemId) {
    var el = document.querySelector('.list-item[data-id="' + activeItemId + '"] .item-text[contenteditable]');
    if (el) updateItemText(getActiveNoteId(), activeItemId, el.innerHTML);
  }
}

function getActiveNoteId() {
  var area = document.querySelector('.items-area');
  return area ? Number(area.dataset.noteId) : null;
}

function placeCaretAtEnd(el) {
  el.focus();
  if (typeof window.getSelection !== 'undefined' && typeof document.createRange !== 'undefined') {
    var range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

function updateNoteTitle(noteId, title) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (note) { note.title = title; save(); }
}
function renameNote(noteId) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  var name = prompt(t('rename'), note.title);
  if (name && name.trim()) { note.title = name.trim(); save(); renderNoteContent(); }
}
function renameBoard(boardId) {
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return;
  var name = prompt(t('rename'), board.name);
  if (name && name.trim()) { board.name = name.trim(); save(); renderBoardContent(); }
}

function indentItem(noteId, itemId) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  var item = note.items.find(function(i) { return i.id === itemId; });
  if (item && item.level < 5) {
    item.level++;
    save();
    var el = document.querySelector('.list-item[data-id="' + itemId + '"]');
    if (el) el.dataset.level = item.level;
  }
}

function outdentItem(noteId, itemId) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  var item = note.items.find(function(i) { return i.id === itemId; });
  if (item && item.level > 0) {
    item.level--;
    save();
    var el = document.querySelector('.list-item[data-id="' + itemId + '"]');
    if (el) el.dataset.level = item.level;
  }
}

function getNotePreview(note) {
  if (note.pwdHash && !unlockedIds['n' + note.id]) return t('passwordProtected');
  if (!note.items || note.items.length === 0) return t('noContent');
  var texts = [];
  for (var i = 0; i < Math.min(note.items.length, 3); i++) {
    var item = note.items[i];
    if (!item || item.type === 'table') continue;
    if (item.type === 'image') {
      texts.push(item.caption ? '\uD83D\uDDBC ' + item.caption : '\uD83D\uDDBC Imagen');
      continue;
    }
    if (!item.text) continue;
    var txt = item.text.replace(/<[^>]*>/g, '').trim();
    if (txt) texts.push(txt.length > 60 ? txt.substring(0, 60) + '...' : txt);
  }
  return texts.length > 0 ? texts.join('<br>') : t('noContent');
}

// --- Study Cards ---
function renderStudyContent() {
  var container = document.getElementById('studyContent');
  if (state.activeStudySetId) {
    renderStudySetCards(container);
  } else {
    renderStudySetList(container);
  }
}
function renderStudySetList(container) {
  var html = '<div class="selection-view"><div class="selection-header"><h2>' + t('studyCards') + '</h2></div><div class="selection-grid">';
  state.studySets.forEach(function(set) {
    var cardCount = set.cards ? set.cards.length : 0;
    html += '<div class="card" data-study-set-id="' + set.id + '" onclick="selectStudySet(' + set.id + ')" style="cursor:pointer;position:relative;"><span class="card-drag-handle" onclick="event.stopPropagation()">&#x2630;</span><div style="font-weight:600;padding:36px 12px 0;">' + escapeHtml(set.name) + '</div><div style="font-size:12px;opacity:0.6;padding:4px 12px 36px;">' + cardCount + ' ' + t('cardList').toLowerCase() + '</div><button class="card-btn" onclick="event.stopPropagation();renameStudySet(' + set.id + ')" style="position:absolute;bottom:8px;right:8px;" title="' + t('edit') + '">&#x270F;</button></div>';
  });
  html += '</div></div>';
  container.innerHTML = html;
  updateBackBtn();
}
function selectStudySet(id) { state.activeStudySetId = id; save(); renderAll(); }
function showNewStudySetDialog() {
  document.getElementById('newStudySetName').value = '';
  showDialog('newStudySetDialog');
  setTimeout(function(){ document.getElementById('newStudySetName').focus(); }, 100);
}
function createStudySet() {
  var name = document.getElementById('newStudySetName').value.trim() || t('newSet');
  state.studySets.push({ id: genId(), name: name, cards: [] });
  closeDialog('newStudySetDialog');
  document.getElementById('newStudySetName').value = '';
  save();
  checkMilestones();
  renderStudyContent();
}
function renameStudySet(id) {
  var set = state.studySets.find(function(s) { return s.id === id; });
  if (!set) return;
  var name = prompt(t('enterSetName'), set.name);
  if (name && name.trim()) { set.name = name.trim(); save(); renderStudyContent(); }
}
function renderStudySetCards(container) {
  var set = state.studySets.find(function(s) { return s.id === state.activeStudySetId; });
  if (!set) { state.activeStudySetId = null; renderStudySetList(container); return; }
  var studying = window._studyingSetId === set.id;
  if (studying) { renderStudyMode(container, set); return; }
  var html = '<div style="padding:20px;box-sizing:border-box;">';
  if (!set.cards || set.cards.length === 0) { html += '<div style="text-align:center;padding:40px;opacity:0.5;">' + t('noCards') + '</div>'; }
  else {
    html += '<div class="study-set-cards" style="display:flex;flex-wrap:wrap;gap:16px;">';
    set.cards.forEach(function(card, i) {
      html += '<div class="study-card-item" data-card-id="' + card.id + '" style="flex:0 0 100%;min-height:160px;background:var(--surface);border-radius:10px;padding:36px 12px 36px;border:1px solid var(--border);display:flex;flex-direction:column;gap:4px;box-sizing:border-box;position:relative;"><span class="card-drag-handle" onclick="event.stopPropagation()">&#x2630;</span><div style="font-weight:600;font-size:18px;"><span style="opacity:0.4;">' + (i+1) + '.</span> ' + renderCardContent(card.front) + '</div><div style="opacity:0.7;font-size:15px;">' + renderCardContent(card.back) + '</div><button class="card-btn" onclick="deleteStudyCard(' + set.id + ',' + card.id + ')" style="position:absolute;top:8px;right:8px;" title="' + t('del') + '">&#x2716;</button><button class="card-btn" onclick="editStudyCard(' + set.id + ',' + card.id + ')" style="position:absolute;bottom:8px;right:8px;" title="' + t('edit') + '">&#x270F;</button></div>';
    });
    html += '</div>';
  }
  html += '</div>';
  container.innerHTML = html;
  updateBackBtn();
}
function startStudy(setId) {
  window._studyingSetId = setId;
  window._studyCards = state.studySets.find(function(s) { return s.id === setId; }).cards.slice();
  for (var i = window._studyCards.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = window._studyCards[i];
    window._studyCards[i] = window._studyCards[j];
    window._studyCards[j] = tmp;
  }
  window._studyTotal = window._studyCards.length;
  window._studyIndex = 0;
  window._studyRevealed = false;
  window._studyComplete = false;
  renderAll();
}
function stopStudy() {
  window._studyingSetId = null; window._studyCards = null; window._studyTotal = 0; window._studyIndex = 0; window._studyRevealed = false; window._studyComplete = false;
  renderAll();
}
function renderStudyMode(container, set) {
  var cards = window._studyCards;
  if (!cards || cards.length === 0) {
    container.innerHTML = '<div class="study-mode-wrapper"><div style="text-align:center;opacity:0.5;">' + t('noCards') + '</div></div>';
    updateBackBtn(); return;
  }
  if (window._studyIndex >= cards.length) {
    container.innerHTML = '<div class="study-mode-wrapper"><div class="study-mode-header"><span class="study-mode-title">' + escapeHtml(set.name) + '</span><button class="btn fmt-action" onclick="stopStudy()">' + t('backToSets') + '</button></div><div class="study-mode-card-area" style="justify-content:center;"><div style="width:100%;max-width:600px;text-align:center;"><div style="font-size:48px;margin-bottom:16px;">&#x1f389;</div><h2>' + t('study') + ' ' + t('backToSets') + '!</h2></div></div></div>';
    updateBackBtn(); return;
  }
  var card = cards[window._studyIndex];
  var html = '<div class="study-mode-wrapper">';
  html += '<div class="study-mode-header"><span class="study-mode-title">' + escapeHtml(set.name) + '</span><button class="btn fmt-action" onclick="stopStudy()">' + t('backToSets') + '</button></div>';
  html += '<div class="study-mode-card-area"><div style="width:100%;text-align:center;">';
  html += '<div class="study-counter">' + window._studyIndex + ' / ' + window._studyTotal + '</div>';
  html += '<div class="study-card" onclick="revealStudyCard()"><div class="study-card-front">' + renderCardContent(card.front) + '</div>';
  if (window._studyRevealed) {
    html += '<div class="study-card-divider"></div><div class="study-card-back">' + renderCardContent(card.back) + '</div>';
  } else {
    html += '<div style="text-align:center;margin-top:20px;opacity:0.4;font-size:14px;">&#x1f441; ' + t('showAnswer') + '</div>';
  }
  html += '</div>';
  if (window._studyRevealed) {
    html += '<div class="study-mode-actions"><button class="btn fmt-action" style="background:#e74c3c;color:#fff;" onclick="studyResult(false)">' + t('dontKnow') + '</button><button class="btn fmt-action" style="background:#2ecc71;color:#fff;" onclick="studyResult(true)">' + t('know') + '</button></div>';
  }
  html += '</div></div></div>';
  container.innerHTML = html;
  updateBackBtn();
}
function revealStudyCard() { if (!window._studyRevealed) { window._studyRevealed = true; renderAll(); } }
function studyResult(knew) {
  var cards = window._studyCards;
  cards[window._studyIndex]._knew = knew;
  window._studyIndex++;
  window._studyRevealed = false;
  if (window._studyIndex >= cards.length) {
    window._studyComplete = true;
  }
  renderAll();
}
var _notifIdCounter = 1;
var _editStudyCardId = null;
var _editStudySetId = null;
var _studyCardImageTarget = null;
var _studyCardPreviewData = null;
function showAddStudyCard(setId) {
  _editStudySetId = setId;
  _editStudyCardId = null;
  cancelStudyCardImage();
  document.getElementById('studyCardFront').innerHTML = '';
  document.getElementById('studyCardBack').innerHTML = '';
  document.getElementById('studyCardTitle').textContent = t('addCard');
  showDialog('studyCardDialog');
  setTimeout(function(){ document.getElementById('studyCardFront').focus(); }, 100);
}
function editStudyCard(setId, cardId) {
  var set = state.studySets.find(function(s) { return s.id === setId; });
  if (!set) return;
  var card = set.cards.find(function(c) { return c.id === cardId; });
  if (!card) return;
  cancelStudyCardImage();
  _editStudySetId = setId;
  _editStudyCardId = cardId;
  document.getElementById('studyCardFront').innerHTML = card.front;
  document.getElementById('studyCardBack').innerHTML = card.back;
  document.getElementById('studyCardTitle').textContent = t('edit');
  showDialog('studyCardDialog');
  setTimeout(function(){ document.getElementById('studyCardFront').focus(); }, 100);
}
function saveStudyCard() {
  var front = document.getElementById('studyCardFront').innerHTML.trim();
  var back = document.getElementById('studyCardBack').innerHTML.trim();
  if (!front || !back) return;
  var set = state.studySets.find(function(s) { return s.id === _editStudySetId; });
  if (!set) return;
  if (_editStudyCardId) {
    var card = set.cards.find(function(c) { return c.id === _editStudyCardId; });
    if (card) { card.front = front; card.back = back; }
  } else {
    set.cards.push({ id: genId(), front: front, back: back });
  }
  closeDialog('studyCardDialog');
  save(); renderStudyContent();
  checkMilestones();
}
function triggerStudyCardImage(target) {
  _studyCardImageTarget = target;
  document.getElementById('studyCardImageInput').value = '';
  document.getElementById('studyCardImageInput').click();
}
function previewStudyCardImage(input) {
  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  if (file.size > 5 * 1024 * 1024) { alert(t('coverTooLarge')); return; }
  var reader = new FileReader();
  reader.onload = function(e) {
    _studyCardPreviewData = e.target.result;
    document.getElementById('studyCardPreviewImg').src = _studyCardPreviewData;
    document.getElementById('studyCardPreview').classList.remove('hidden');
  };
  reader.readAsDataURL(file);
}
function confirmStudyCardImage() {
  if (!_studyCardPreviewData) return;
  var data = _studyCardPreviewData;
  var id = _studyCardImageTarget === 'front' ? 'studyCardFront' : 'studyCardBack';
  var el = document.getElementById(id);
  if (!el) { cancelStudyCardImage(); return; }
  cancelStudyCardImage();
  var img = document.createElement('img');
  img.src = data;
  img.style.cssText = 'max-width:100%;max-height:200px;height:auto;object-fit:contain;border-radius:4px;margin:4px 0;display:block;';
  el.appendChild(img);
  el.focus();
}
function cancelStudyCardImage() {
  _studyCardPreviewData = null;
  document.getElementById('studyCardPreview').classList.add('hidden');
  document.getElementById('studyCardPreviewImg').src = '';
  document.getElementById('studyCardImageInput').value = '';
}
function renderCardContent(text) {
  if (!text) return '';
  var parts = text.split(/(<img[^>]*>|<br\s*\/?>)/gi);
  return parts.map(function(part) {
    if (/^<img[^>]*>$/i.test(part)) return part.replace('<img ', '<img class="card-list-img" ');
    if (/^<br\s*\/?>$/i.test(part)) return part;
    return part;
  }).join('');
}
function deleteStudyCard(setId, cardId) {
  if (!confirm(t('del') + '?')) return;
  var set = state.studySets.find(function(s) { return s.id === setId; });
  if (!set) return;
  set.cards = set.cards.filter(function(c) { return c.id !== cardId; });
  save(); renderStudyContent();
}

function showMilestoneReminder() {
  var container = document.getElementById('milestoneButtons');
  if (container) {
    var url = 'https://cafecito.app/_aksk_';
    container.innerHTML = '<a href="' + url + '" target="_blank" rel="noopener" class="cafecito-btn">' + t('libro') + '</a><a href="' + url + '" target="_blank" rel="noopener" class="cafecito-btn">' + t('estante') + '</a><a href="' + url + '" target="_blank" rel="noopener" class="cafecito-btn">' + t('galeria') + '</a><a href="' + url + '" target="_blank" rel="noopener" class="cafecito-btn">' + t('salaBabel') + '</a>';
  }
  showDialog('milestoneDialog');
}
function checkMilestones() {
  function genArith(start, step, upTo) {
    var ms = [];
    for (var m = start; m <= upTo; m += step) ms.push(m);
    return ms;
  }
  function genPostit(upTo) {
    var ms = [];
    if (upTo >= 15) ms.push(15);
    if (upTo >= 25) ms.push(25);
    if (upTo >= 40) ms.push(40);
    if (upTo >= 50) ms.push(50);
    for (var m = 65; m <= upTo; m += 15) ms.push(m);
    return ms;
  }
  function genSet(upTo) {
    if (upTo < 2) return [];
    var ms = [2];
    var cur = 2, diff = 3;
    while (true) {
      cur += diff;
      if (cur > upTo) break;
      ms.push(cur);
      if (diff === 3) diff = 6;
      else diff++;
    }
    return ms;
  }
  var triggered = state._triggeredMilestones || [];
  var toCheck = [];
  genArith(5, 5, state._exportCount || 0).forEach(function(m) { toCheck.push({ id: 'export_' + m, count: state._exportCount || 0, threshold: m }); });
  genArith(5, 5, state.notes.length).forEach(function(m) { toCheck.push({ id: 'note_' + m, count: state.notes.length, threshold: m }); });
  (function() {
    var total = 0;
    state.boards.forEach(function(b) { total += (b.postits || []).length; });
    genPostit(total).forEach(function(m) { toCheck.push({ id: 'postit_' + m, count: total, threshold: m }); });
  })();
  genSet(state.studySets.length).forEach(function(m) { toCheck.push({ id: 'set_' + m, count: state.studySets.length, threshold: m }); });
  (function() {
    var totalCards = 0;
    state.studySets.forEach(function(s) { totalCards += (s.cards || []).length; });
    genArith(10, 15, totalCards).forEach(function(m) { toCheck.push({ id: 'card_' + m, count: totalCards, threshold: m }); });
  })();
  for (var i = 0; i < toCheck.length; i++) {
    var item = toCheck[i];
    if (item.count >= item.threshold && triggered.indexOf(item.id) === -1) {
      triggered.push(item.id);
      state._triggeredMilestones = triggered;
      save();
      setTimeout(function() { showMilestoneReminder(); }, 500);
      break;
    }
  }
}
function trackExport() {
  state._exportCount = (state._exportCount || 0) + 1;
  save();
  checkMilestones();
}
function renderCafecitoContent() {
  var container = document.getElementById('cafecitoContent');
  var url = 'https://cafecito.app/_aksk_';
  container.innerHTML = '<div class="cafecito-page"><div class="cafecito-icon"><img src="Isotipo.png" alt="Isotipo" class="cafecito-img"></div><h2>Expandir la Biblioteca</h2><p class="cafecito-desc">' + t('cafecitoDesc') + '</p><div class="cafecito-buttons"><a href="' + url + '" target="_blank" rel="noopener" class="cafecito-btn">' + t('libro') + ' \u2615 1</a><a href="' + url + '" target="_blank" rel="noopener" class="cafecito-btn">' + t('estante') + ' \u2615 10</a><a href="' + url + '" target="_blank" rel="noopener" class="cafecito-btn">' + t('galeria') + ' \u2615 20</a><a href="' + url + '" target="_blank" rel="noopener" class="cafecito-btn">' + t('salaBabel') + ' \u2615 50</a></div></div>';
}
function renderTrashContent() {
  var container = document.getElementById('trashContent');
  var typeIcons = { note: '\uD83D\uDCC4', board: '\uD83D\uDCCB', studySet: '\uD83C\uDCC7' };
  var typeLabels = { note: t('trashTypeNote'), board: t('trashTypeBoard'), studySet: t('trashTypeStudySet') };
  var html = '<div class="selection-view"><div class="selection-header"><h2>&#x1f5d1; ' + t('trash') + '</h2></div>';
  html += '<div style="font-size:12px;color:var(--text-muted);padding:12px 20px;border-bottom:1px solid var(--border);">' + t('trashSubtitle') + '</div>';
  if (state.trash.length === 0) {
    html += '<div class="trash-empty">' + t('trashEmpty') + '</div>';
  } else {
    html += '<div class="trash-list">';
    state.trash.forEach(function(item, i) {
      var title = item.data.name || item.data.title || '(sin t\u00edtulo)';
      var daysLeft = Math.max(0, 30 - Math.floor((Date.now() - item.deletedAt) / (24*60*60*1000)));
      html += '<div class="trash-item" style="display:flex;align-items:center;justify-content:space-between;padding:12px 20px;border-bottom:1px solid var(--border);">' +
        '<div class="trash-item-info" style="flex:1;min-width:0;">' +
        '<div class="trash-item-title" style="font-size:14px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + (typeIcons[item.type] || '') + ' ' + escapeHtml(title) + '</div>' +
        '<div class="trash-item-days" style="font-size:11px;color:var(--text-muted);margin-top:2px;">' + (typeLabels[item.type] || '') + ' &middot; ' + (daysLeft > 0 ? t('trashDaysLeft') + daysLeft + t('trashDaysUnit') : t('trashDeletedSoon')) + '</div></div>' +
        '<div class="trash-item-actions" style="display:flex;gap:6px;flex-shrink:0;margin-left:12px;">' +
        '<button class="btn" onclick="restoreFromTrash(' + i + ')">' + t('restore') + '</button>' +
        '<button class="btn" onclick="if(confirm(\'' + t('confirmDeletePermanent') + '\'))deleteFromTrashPermanently(' + i + ')">' + t('deletePermanent') + '</button></div></div>';
    });
    html += '</div>';
  }
  html += '</div>';
  container.innerHTML = html;
}

function renderNoteContent() {
  var container = document.getElementById('noteContent');
  var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
  if (!note) {
    var regularNotes = state.notes.filter(function(n) { return !n.diary; });
    var html = '<div class="selection-view"><div class="selection-header"><h2>' + t('notes') + '</h2></div><div class="selection-grid">';
    if (regularNotes.length === 0) {
      html += '<div class="selection-empty">' + t('noNotes') + '</div>';
    } else {
      regularNotes.forEach(function(n) {
        var locked = n.pwdHash && !unlockedIds['n' + n.id];
        var lock = locked ? '<span class="card-lock">&#x1f512;</span>' : '';
        var fav = n.favorite ? '<span class="card-fav">&#x2605;</span>' : '';
        var coverStyle = n.cover ? ' style="background-image:url(' + n.cover + ');background-size:cover;background-position:center;"' : '';
        html += '<div class="card' + (n.cover ? ' card-has-cover' : '') + '" data-note-id="' + n.id + '" onclick="selectNote(' + n.id + ')">' +
          '<span class="card-drag-handle" onclick="event.stopPropagation()">&#x2630;</span>' +
          lock + fav +
          '<span class="card-date">' + fmtDate(n.createdAt) + '</span>' +
          '<div class="card-title">' + escapeHtml(n.title) + '</div>' +
          '<div class="card-preview"' + coverStyle + '>' + (n.cover ? '' : getNotePreview(n)) + '</div></div>';
      });
    }
    html += '</div></div>';
    var savedGridTop = document.querySelector('.selection-grid');
    var savedGridScroll = savedGridTop ? savedGridTop.scrollTop : 0;
    container.innerHTML = html;
    updateBackBtn();
    if (savedGridScroll > 0) { var ng = document.querySelector('.selection-grid'); if (ng) ng.scrollTop = savedGridScroll; }
    return;
  }
  updateBackBtn();
  var html = '';
  if (note.cover) html += '<div class="note-cover" style="background-image:url(' + note.cover + ');"></div>';
  html += '<div class="items-area" data-note-id="' + note.id + '">';
  if (note.items.length === 0) {
    html += '<div style="color:#555;font-size:13px;padding:20px;text-align:center;">' + t('addItemsPrompt') + '</div>';
  } else {
    note.items.forEach(function(item) {
      if (item.type === 'image') {
        html += '<div class="list-item image-item" data-id="' + item.id + '">';
        html += '<div class="image-container">';
        html += '<img src="" data-ref="' + escapeHtml(item.src) + '" alt="" />';
        html += '</div>';
        html += '<div contenteditable="true" class="image-caption" data-placeholder="A\u00f1adir pie de foto..." oninput="updateImageCaption(' + note.id + ', ' + item.id + ', this.innerHTML)">' + (item.caption || '') + '</div>';
        html += '<span class="item-actions">';
        html += '<button class="btn btn-sm btn-icon" onclick="deleteItem(' + note.id + ', ' + item.id + ')">&times;</button>';
        html += '</span></div>';
      } else if (item.type === 'audio') {
        html += '<div class="list-item image-item item-audio-block" data-id="' + item.id + '">';
        html += '<div class="audio-player-wrap" data-ref="' + escapeHtml(item.ref) + '"></div>';
        html += '<span class="item-actions">';
        html += '<button class="btn btn-sm btn-icon" onclick="deleteItem(' + note.id + ', ' + item.id + ')">&times;</button>';
        html += '</span></div>';
      } else if (item.type === 'table') {
        html += '<div class="list-item" data-id="' + item.id + '" style="position:relative;">';
        html += renderTableData(item, note.id);
        html += '<span class="item-actions" style="position:absolute;top:4px;right:4px;">';
        html += '<button class="btn btn-sm" onclick="deleteItem(' + note.id + ', ' + item.id + ')">&times;</button>';
        html += '</span></div>';
      } else {
        var isText = item.type === 'text';
        html += '<div class="list-item' + (isText ? ' text' : '') + '" data-id="' + item.id + '" data-level="' + item.level + '">';
        if (!isText) html += '<span class="drag-handle">&#x2630;</span>';
        if (!isText) html += '<input type="checkbox" class="item-check"' + (item.checked ? ' checked' : '') + ' onchange="toggleItem(' + note.id + ', ' + item.id + ')" />';
         html += '<div contenteditable="true" class="item-text' + (item.checked ? ' checked' : '') + '" data-placeholder="' + (isText ? t('textPlaceholder') : t('itemPlaceholder')) + '" oninput="updateItemText(' + note.id + ', ' + item.id + ', this.innerHTML);computeOnEquals(this,' + note.id + ',' + item.id + ')" onfocus="activeItemId=' + item.id + '" onblur="if (activeItemId==' + item.id + ') { activeItemId=null; }">' + renderLatexInHtml(parseNoteLinks(item.text || '')) + '</div>';
        html += '<span class="item-actions">';
        if (!isText) html += '<button class="btn btn-sm btn-icon" onclick="indentItem(' + note.id + ', ' + item.id + ')">&rarr;</button>';
        if (!isText) html += '<button class="btn btn-sm btn-icon" onclick="outdentItem(' + note.id + ', ' + item.id + ')">&larr;</button>';
        html += '<button class="btn btn-sm btn-icon" onclick="deleteItem(' + note.id + ', ' + item.id + ')">&times;</button>';
        html += '</span></div>';
      }
    });
  }
  html += '</div>';
  /* Eventos y tareas integrados en la nota */
  var hasEvents = note.events && note.events.length > 0;
  var hasTasks = note.tasks && note.tasks.length > 0;
  if (hasEvents || hasTasks) {
    html += '<div class="reminder-section">';
    if (hasEvents) {
      html += '<div class="reminder-group-label">' + t('event') + 's</div>';
      note.events.forEach(function(ev) {
        html += '<div class="reminder-item reminder-event" data-uuid="' + ev.uuid + '">';
        html += '<span class="reminder-icon">&#x1f4c5;</span>';
        html += '<span class="reminder-title">' + escapeHtml(ev.title) + '</span>';
        html += '<span class="item-actions">';
        html += '<button class="btn btn-sm btn-icon" onclick="deleteReminder(' + note.id + ',\'' + ev.uuid + '\')">&times;</button>';
        html += '</span></div>';
      });
    }
    if (hasTasks) {
      html += '<div class="reminder-group-label">' + t('task') + 's</div>';
      note.tasks.forEach(function(tk) {
        var checked = tk.status === 'completed' ? ' checked' : '';
        html += '<div class="reminder-item reminder-task" data-uuid="' + tk.uuid + '">';
        html += '<input type="checkbox" class="reminder-check"' + checked + ' onchange="toggleTaskStatus(' + note.id + ',\'' + tk.uuid + '\')" />';
        html += '<span class="reminder-title' + (checked ? ' reminder-done' : '') + '">' + escapeHtml(tk.title) + '</span>';
        html += '<span class="item-actions">';
        html += '<button class="btn btn-sm btn-icon" onclick="deleteReminder(' + note.id + ',\'' + tk.uuid + '\')">&times;</button>';
        html += '</span></div>';
      });
    }
    html += '</div>';
  }
  /* Replicados de otras notas del diario por repeticion */
  if (note.diary) {
    var todayParts = note.title.split('-').map(function(x){return parseInt(x,10);});
    if (todayParts.length === 3) {
      var targetDate = new Date(todayParts[2], todayParts[1] - 1, todayParts[0]);
      var replicatedHtml = '';
      state.notes.forEach(function(otherNote) {
        if (!otherNote.diary || otherNote.id === note.id) return;
        var all = (otherNote.events || []).concat(otherNote.tasks || []);
        all.forEach(function(e) {
          if (!e.repetition || e.repetition === 'none') return;
          if (!repetitionMatchesToday(e, targetDate)) return;
          replicatedHtml += '<div class="reminder-item reminder-replicated" data-uuid="' + e.uuid + '" data-origin="' + otherNote.id + '" onclick="openNoteById(' + otherNote.id + ')" title="' + t('diary') + ': ' + escapeHtml(otherNote.title) + '">';
          replicatedHtml += '<span class="reminder-replicated-icon">&#x1f517;</span>';
          replicatedHtml += '<span class="reminder-title reminder-replicated-title">' + escapeHtml(e.title) + '</span>';
          replicatedHtml += '</div>';
        });
      });
      if (replicatedHtml) {
        html += '<div class="reminder-section">';
        html += '<div class="reminder-group-label">' + t('diarySection') + '</div>';
        html += replicatedHtml;
        html += '</div>';
      }
    }
  }
  html += '<div class="fmt-bar">';
  html += '<button class="fmt-btn" id="fmtBold" onmousedown="event.preventDefault()" onclick="formatBold()" title="' + t('bold') + '"><b>B</b></button>';
  html += '<button class="fmt-btn" id="fmtItalic" onmousedown="event.preventDefault()" onclick="formatItalic()" title="' + t('italic') + '"><i>I</i></button>';
  html += '<button class="fmt-btn" id="fmtUnderline" onmousedown="event.preventDefault()" onclick="formatUnderline()" title="' + t('underline') + '"><u>U</u></button>';
  html += '<div style="display:inline-block;">';
  html += '<button class="fmt-btn hl-toggle" onclick="applyHighlight()" title="' + t('highlight') + '"><span style="background:' + _hlColor + ';padding:0 2px;font-weight:bold;">A</span></button>';
  html += '<div id="hlPalette" class="hidden" style="position:fixed;z-index:10000;background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:4px;display:flex;gap:3px;">';
  html += '<span class="hl-color" style="background:#ffff00;" onmousedown="event.preventDefault()" onclick="selectHighlightColor(\'#ffff00\');event.stopPropagation();" title="Yellow"></span>';
  html += '<span class="hl-color" style="background:#87ceeb;" onmousedown="event.preventDefault()" onclick="selectHighlightColor(\'#87ceeb\');event.stopPropagation();" title="Celeste"></span>';
  html += '<span class="hl-color" style="background:#ffb6c1;" onmousedown="event.preventDefault()" onclick="selectHighlightColor(\'#ffb6c1\');event.stopPropagation();" title="Pink"></span>';
  html += '<span class="hl-color" style="background:#ffa500;" onmousedown="event.preventDefault()" onclick="selectHighlightColor(\'#ffa500\');event.stopPropagation();" title="Orange"></span>';
  html += '<span class="hl-color" style="background:#90ee90;" onmousedown="event.preventDefault()" onclick="selectHighlightColor(\'#90ee90\');event.stopPropagation();" title="Green"></span>';
  html += '<span class="hl-color" style="background:transparent;border:1px dashed var(--text-muted);display:inline-flex;align-items:center;justify-content:center;font-size:14px;" onmousedown="event.preventDefault()" onclick="selectRemoveHighlight();event.stopPropagation();" title="Remove highlight">&#x2716;</span>';
  html += '</div></div>';
  html += '<button class="fmt-btn" onclick="formatBulletList()" title="' + t('bulletList') + '">&#x2022;</button>';
  html += '<button class="fmt-btn" onclick="formatNumberedList()" title="' + t('numberedList') + '">1.</button>';
  html += '<span style="width:1px;height:20px;background:var(--border);margin:0 6px;"></span>';
  html += '<button class="fmt-btn fmt-align-btn" onclick="cycleAlignment()" title="' + t('alignLeft') + '">\u2194</button>';
  html += '<span style="width:1px;height:20px;background:var(--border);margin:0 6px;"></span>';
  html += '<button class="btn fmt-action" onclick="addItem()" title="' + t('addItem') + '">[&#x2713;]</button>';
  html += '<button class="btn fmt-action" onclick="addTextItem()" title="' + t('addText') + '"><b>T</b></button>';
  html += '<button class="btn fmt-action" onclick="triggerInsertImage()" title="' + t('insertImage') + '">&#x1f304;</button>';
  html += '<button class="btn fmt-action" onclick="document.getElementById(\'audioInput\').click()" title="' + t('insertAudio') + '">&#x1F3A4; ' + t('insertAudio') + '</button>';
  html += '<button class="btn fmt-action" onclick="showTableDialog()" title="' + t('insertTable') + '">&#x229E;</button>';
  html += '<button class="btn fmt-action" onclick="openReminderDialog()" title="' + t('remindMe') + '">' + t('remindMe') + '</button>';
  html += '<button class="btn fmt-action" onclick="insertLatexBlock()" title="' + t('insertEquation') + '" style="font-weight:bold;font-size:15px;">&#x2211;</button>';
  html += '<span style="flex:1"></span>';
  html += '<div style="position:relative;display:inline-block;">';
  html += '<button class="btn fmt-action exp-toggle" onclick="toggleExportPalette()" title="' + t('export') + '">' + t('export') + '</button>';
  html += '<div id="exportPalette" class="hidden" style="position:fixed;z-index:10000;background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:4px;display:flex;flex-direction:column;gap:2px;">';
  html += '<button class="export-opt" onclick="exportCurrentNoteToPdf();event.stopPropagation();">PDF</button>';
  html += '<button class="export-opt" onclick="exportCurrentNoteToTxt();event.stopPropagation();">TXT</button>';
  html += '<button class="export-opt" onclick="exportCurrentNoteToDoc();event.stopPropagation();">DOC</button>';
  html += '</div></div>';
  html += '</div>';
  var savedScrollTop = 0, savedActiveId = activeItemId;
  var oldArea = document.querySelector('.items-area');
  if (oldArea) savedScrollTop = oldArea.scrollTop;
  container.innerHTML = html;
  if (savedScrollTop > 0) { var newArea = document.querySelector('.items-area'); if (newArea) newArea.scrollTop = savedScrollTop; }
  if (savedActiveId !== null && savedActiveId !== undefined) {
    var targetEl = document.querySelector('.list-item[data-id="' + savedActiveId + '"] .item-text[contenteditable]');
    if (targetEl) { targetEl.focus(); placeCaretAtEnd(targetEl); }
  }
  updateTableFab();
  loadNoteImages();
  loadNoteAudios();
}

/* Carga los reproductores de audio en las notas */
function loadNoteAudios() {
  var wrappers = document.querySelectorAll('.audio-player-wrap[data-ref]');
  [].forEach.call(wrappers, function(wrapper) {
    var ref = wrapper.getAttribute('data-ref');
    if (!ref) return;
    wrapper.removeAttribute('data-ref');
    createAudioPlayer(ref, wrapper, {});
  });
}

function showNewBoardDialog() {
  document.getElementById('newBoardPwd').value = '';
  showDialog('newBoardDialog');
  setTimeout(function(){ document.getElementById('newBoardName').focus(); }, 100);
}

function createBoard() {
  var name = document.getElementById('newBoardName').value.trim() || t('newBoardLabel');
  var pwd = document.getElementById('newBoardPwd').value;
  var board = { id: genId(), name: name, postits: [], connections: [], boardBg: state.defaultBoardBg, pwdHash: hashPwd(pwd), createdAt: Date.now() };
  state.boards.push(board);
  state.activeBoardId = board.id;
  if (pwd) unlockedIds['b' + board.id] = true;
  closeDialog('newBoardDialog');
  document.getElementById('newBoardName').value = '';
  document.getElementById('newBoardPwd').value = '';
  save();
  renderAll();
}

function setBoardBg(bg) {
  var board = state.boards.find(function(b) { return b.id === state.activeBoardId; });
  if (!board) return;
  board.boardBg = bg;
  save();
  renderBoardContent();
}

function addPostit(color) {
  var board = state.boards.find(function(b) { return b.id === state.activeBoardId; });
  if (!board) return;
  var wrap = document.querySelector('.board-canvas-wrap');
  var vx = wrap ? wrap.scrollLeft : 0;
  var vy = wrap ? wrap.scrollTop : 0;
  var ox = (vx + 50 + Math.round(Math.random() * 200)) / boardZoom;
  var oy = (vy + 50 + Math.round(Math.random() * 150)) / boardZoom;
  board.postits.push({ id: genId(), text: '', color: color || 'yellow', x: ox, y: oy, w: 180, h: 180 });
  save();
  checkMilestones();
  renderBoardContent();
}

function deletePostit(boardId, postitId) {
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return;
  board.postits = board.postits.filter(function(p) { return p.id !== postitId; });
  board.connections = board.connections.filter(function(c) { return c.from !== postitId && c.to !== postitId; });
  save();
  renderBoardContent();
}

function updatePostitText(boardId, postitId, text) {
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return;
  var p = board.postits.find(function(p) { return p.id === postitId; });
  if (p) { p.text = unparseNoteLinks(unrenderLatexInHtml(text || '')); save(); }
}

function cancelConnect() {
  if (!connectState || !connectState.active) return;
  connectState.active = false;
  connectState.fromId = null;
  Array.prototype.forEach.call(document.querySelectorAll('.postit, .board-element'), function(el) { el.classList.remove('connecting'); });
  var wrap = document.querySelector('.board-canvas-wrap');
  if (wrap) wrap.classList.remove('connecting-mode');
  setStatus('');
}

function startConnection(elementId) {
  if (!connectState || !connectState.active) return;
  if (connectState.boardId !== state.activeBoardId) return;
  var board = state.boards.find(function(b) { return b.id === state.activeBoardId; });
  if (!board) return;
  if (!connectState.fromId) {
    connectState.fromId = elementId;
    var el = document.querySelector('[data-id="' + elementId + '"]');
    if (el) el.classList.add('connecting');
    setStatus(t('clickDestiny'));
  } else if (connectState.fromId !== elementId) {
    var exists = board.connections.some(function(c) {
      return (c.from === connectState.fromId && c.to === elementId) ||
             (c.from === elementId && c.to === connectState.fromId);
    });
    if (!exists) {
      board.connections.push({ from: connectState.fromId, to: elementId });
      save();
      setStatus(t('connectionCreated'));
    } else {
      setStatus(t('connectionExists'));
    }
    Array.prototype.forEach.call(document.querySelectorAll('.postit, .board-element'), function(el) { el.classList.remove('connecting'); });
    var w = document.querySelector('.board-canvas-wrap');
    if (w) w.classList.remove('connecting-mode');
    connectState.fromId = null;
    connectState.active = false;
    renderBoardContent();
  } else {
    setStatus(t('chooseOther'));
  }
}

function showContextMenu(x, y, items) {
  var menu = document.getElementById('contextMenu');
  menu.innerHTML = '';
  items.forEach(function(item) {
    var div = document.createElement('div');
    div.className = 'context-item';
    div.textContent = item.label;
    (function(action) { div.onclick = function(e) { e.stopPropagation(); hideContextMenu(); action(); }; })(item.action);
    menu.appendChild(div);
  });
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';
  menu.classList.remove('hidden');
}

function hideContextMenu() {
  document.getElementById('contextMenu').classList.add('hidden');
  _fabLongPressed = false;
}

function contextConnect(elementId) {
  if (!elementId) return;
  var board = state.boards.find(function(b) { return b.id === state.activeBoardId; });
  if (!board) { setStatus(t('needPostits')); return; }
  var totalCount = (board.postits || []).length + (board.elements || []).length;
  if (totalCount < 2) { setStatus(t('needPostits')); return; }
  var el = document.querySelector('[data-id="' + elementId + '"]');
  if (el) el.classList.add('connecting');
  connectState = { active: true, fromId: elementId, boardId: state.activeBoardId };
  var wrap = document.querySelector('.board-canvas-wrap');
  if (wrap) wrap.classList.add('connecting-mode');
  setStatus(t('clickDestiny'));
}

function toggleFavorite(noteId) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  note.favorite = !note.favorite;
  save();
  renderNoteContent();
}

function exportNoteToPdf(noteId) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  trackExport();
  showToast(t('processingExport'));
  if (!window.PDFLib) {
    setStatus('Error: librería PDF no disponible');
    return;
  }
  setStatus('PDF: 1/5 Cargando fuente...');
  var fontBuf;
  fetch('lib/NotoSans.ttf')
    .then(function(r) {
      if (!r.ok) throw new Error('Font not found');
      return r.arrayBuffer();
    })
    .then(function(buf) {
      fontBuf = buf;
      setStatus('PDF: 2/5 Creando documento...');
      return PDFLib.PDFDocument.create();
    })
    .catch(function() {
      fontBuf = null;
      setStatus('PDF: 2/5 Usando Helvetica (fallback)...');
      return PDFLib.PDFDocument.create();
    })
    .then(function(pdfDoc) {
      pdfDoc.registerFontkit(fontkit);
      var embedPromise = fontBuf
        ? pdfDoc.embedFont(fontBuf)
        : pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
      return embedPromise.then(function(font) {
        setStatus('PDF: 3/5 Dibujando contenido...');
        var page = pdfDoc.addPage([595.28, 841.89]);
        var margin = 50;
        var y = 800;
        var processPromise = note.items.reduce(function(promise, item) {
          return promise.then(function() {
            if (item.type === 'image') {
              return ImageManager.read(item.src).then(function(base64) {
                if (!base64) { y -= 18; return; }
                return ImageConverter.webpToPng(base64, item.width, item.height).then(function(pngBase64) {
                  var pngBytes = ImageConverter.base64ToBytes(pngBase64);
                  return pdfDoc.embedPng(pngBytes).then(function(pngImage) {
                    if (y < 50) { page = pdfDoc.addPage([595.28, 841.89]); y = 800; }
                    var maxWidth = 495.28;
                    var drawW = item.width || 200;
                    var drawH = item.height || 150;
                    var scale = Math.min(1, maxWidth / drawW);
                    drawW = Math.round(drawW * scale);
                    drawH = Math.round(drawH * scale);
                    if (drawH > y - 50) { drawH = y - 50; drawW = Math.round(drawW * (y - 50) / drawH); }
                    page.drawImage(pngImage, { x: margin, y: y - drawH, width: drawW, height: drawH });
                    y -= (drawH + 12);
                  });
                });
              }).catch(function(err) {
                console.error('Image error in PDF:', err);
                y -= 18;
              });
            }
            var rawText = (item.text || '').trim();
            if (!rawText) return;
            if (y < 50) { page = pdfDoc.addPage([595.28, 841.89]); y = 800; }
            var indent = margin + (item.level || 0) * 28;
            if (rawText.indexOf('$') >= 0) {
              /* Contains LaTeX - render to image */
              var displayHtml = renderLatexInHtml(parseNoteLinks(rawText));
              return renderTextToCanvas(displayHtml, 495.28).then(function(result) {
                var pngBytes = ImageConverter.base64ToBytes(result.base64);
                return pdfDoc.embedPng(pngBytes).then(function(pngImage) {
                  if (y < 50) { page = pdfDoc.addPage([595.28, 841.89]); y = 800; }
                  var drawW = Math.min(result.width, 495.28);
                  var drawH = result.height * (drawW / result.width);
                  if (drawH > y - 50) { drawH = y - 50; drawW = drawH * (result.width / result.height); }
                  page.drawImage(pngImage, { x: indent, y: y - drawH, width: drawW, height: drawH });
                  y -= (drawH + 12);
                });
              });
            }
            var text = rawText.replace(/<[^>]*>/g, '').trim();
            if (!text) return;
            if (item.type === 'list') text = (item.checked ? '[x] ' : '[ ] ') + text;
            var maxWidth = 595.28 - indent - margin;
            if (maxWidth > 0) {
              page.drawText(text, { x: indent, y: y, size: 11, font: font, color: PDFLib.rgb(0.3, 0.3, 0.3), maxWidth: maxWidth });
            }
            y -= 18;
          });
        }, Promise.resolve());
        setStatus('PDF: 4/5 Generando PDF...');
        return processPromise.then(function() { return pdfDoc.save(); });
      });
    })
    .then(function(pdfBytes) {
      setStatus('PDF: 5/5 Guardando archivo...');
      saveFile(sanitizeFilename(note.title) + '.pdf', pdfBytes, 'application/pdf');
    })
    .catch(function(e) {
      var msg = e.message || JSON.stringify(e);
      console.error('PDF generation error:', e);
      setStatus('PDF Error: ' + msg);
    });
}
function exportCurrentNoteToPdf() { exportNoteToPdf(state.activeNoteId); }
function getExportText(noteId) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return '';
  var text = '';
  note.items.forEach(function(item) {
    if (item.type === 'image') {
      text += '[Imagen' + (item.caption ? ': ' + item.caption : '') + ']\n\n';
      return;
    }
    var t = (item.text || '').replace(/<[^>]*>/g, '').trim();
    if (!t) return;
    if (item.type === 'text') text += t + '\n\n';
    else text +='- ' + t + '\n';
  });
  return text || 'No content';
}
function exportNoteToTxt(noteId) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  var text = getExportText(noteId);
  saveFile(sanitizeFilename(note.title) + '.txt', text, 'text/plain');
  trackExport();
}
function exportNoteToDoc(noteId) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  trackExport();
  showToast(t('processingExport'));
  if (window.docx) {
    var children = [];
    var processPromise = note.items.reduce(function(promise, item) {
      return promise.then(function() {
        if (item.type === 'image') {
          return ImageManager.read(item.src).then(function(base64) {
            if (!base64) return;
            return ImageConverter.webpToPng(base64, item.width, item.height).then(function(pngBase64) {
              var pngBytes = ImageConverter.base64ToBytes(pngBase64);
              try {
                children.push(new docx.Paragraph({
                  children: [new docx.ImageRun({
                    data: pngBytes,
                    transformation: { width: Math.min(item.width || 400, 500), height: Math.min(item.height || 300, 500) }
                  })],
                  spacing: { before: 200, after: item.caption ? 40 : 200 }
                }));
                if (item.caption) {
                  children.push(new docx.Paragraph({
                    children: [new docx.TextRun({ text: item.caption, size: 16, color: '888888', italics: true })],
                    alignment: docx.AlignmentType.CENTER,
                    spacing: { after: 200 }
                  }));
                }
              } catch(e) {
                console.error('Error adding image to DOCX:', e);
              }
            });
          }).catch(function(err) {
            console.error('Image error in DOCX:', err);
          });
        }
        var rawText = (item.text || '').trim();
        if (!rawText) return;
        if (rawText.indexOf('$') >= 0) {
          /* Contains LaTeX - render to image */
          var displayHtml = renderLatexInHtml(parseNoteLinks(rawText));
          return renderTextToCanvas(displayHtml, 500).then(function(result) {
            var pngBytes = ImageConverter.base64ToBytes(result.base64);
            try {
              children.push(new docx.Paragraph({
                children: [new docx.ImageRun({
                  data: pngBytes,
                  transformation: { width: Math.min(result.width, 500), height: Math.min(result.height, 500) }
                })],
                spacing: { before: 200, after: 200 }
              }));
            } catch(e) {
              console.error('Error adding LaTeX image to DOCX:', e);
            }
          });
        }
        var text = rawText.replace(/<[^>]*>/g, '').trim();
        if (!text) return;
        if (item.type === 'list') text = (item.checked ? '\u2611 ' : '\u2610 ') + text;
        var indent = (item.level || 0) * 28;
        children.push(new docx.Paragraph({
          children: [new docx.TextRun({ text: text, size: 20 })],
          indent: { left: indent },
          spacing: { before: 60, after: 60 }
        }));
      });
    }, Promise.resolve());
    processPromise.then(function() {
      if (note.items.length === 0) {
        children.push(new docx.Paragraph({
          children: [new docx.TextRun({ text: 'No content', size: 20, color: '999999' })]
        }));
      }
      var doc = new docx.Document({ sections: [{ children: children }] });
      return docx.Packer.toBlob(doc);
    }).then(function(blob) {
      saveFile(sanitizeFilename(note.title) + '.docx', blob, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    }).catch(function(err) {
      console.error('Error exporting DOCX:', err);
      setStatus('Error al exportar DOCX: ' + (err.message || JSON.stringify(err)));
    });
  } else {
    setStatus('Error: librería DOCX no disponible');
  }
}
function exportCurrentNoteToTxt() { exportNoteToTxt(state.activeNoteId); }
function exportCurrentNoteToDoc() { exportNoteToDoc(state.activeNoteId); }
function toggleExportPalette() {
  var palette = document.getElementById('exportPalette');
  if (palette.classList.contains('hidden')) {
    var btn = document.querySelector('.exp-toggle');
    if (btn) {
      var rect = btn.getBoundingClientRect();
      palette.classList.remove('hidden');
      palette.style.top = (rect.top - palette.offsetHeight) + 'px';
      palette.style.left = (rect.right - palette.offsetWidth) + 'px';
    }
  } else {
    palette.classList.add('hidden');
  }
}

function changePostitColor(boardId, postitId, color) {
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return;
  var p = board.postits.find(function(p) { return p.id === postitId; });
  if (p) { p.color = color; save(); renderBoardContent(); }
}

function deleteConnection(boardId, fromId, toId) {
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return;
  board.connections = board.connections.filter(function(c) { return !(c.from === fromId && c.to === toId); });
  save();
  renderBoardContent();
}

/* === Funciones para elementos multimedia en tablero === */

function addBoardElement(type, ref, w, h, extra) {
  var board = state.boards.find(function(b) { return b.id === state.activeBoardId; });
  if (!board) return;
  if (!board.elements) board.elements = [];
  var wrap = document.querySelector('.board-canvas-wrap');
  var vx = wrap ? wrap.scrollLeft : 0;
  var vy = wrap ? wrap.scrollTop : 0;
  var el = {
    id: genId(),
    type: type,
    ref: ref,
    x: (vx + 50 + Math.round(Math.random() * 200)) / boardZoom,
    y: (vy + 50 + Math.round(Math.random() * 150)) / boardZoom,
    w: w || 200,
    h: h || 180,
    origWidth: extra && extra.origWidth ? extra.origWidth : (w || 200),
    origHeight: extra && extra.origHeight ? extra.origHeight : (h || 180),
    duration: extra && extra.duration ? extra.duration : 0
  };
  board.elements.push(el);
  save();
  renderBoardContent();
}

function addBoardEquation() {
  var board = state.boards.find(function(b) { return b.id === state.activeBoardId; });
  if (!board) return;
  if (!board.elements) board.elements = [];
  var wrap = document.querySelector('.board-canvas-wrap');
  var vx = wrap ? wrap.scrollLeft : 0;
  var vy = wrap ? wrap.scrollTop : 0;
  var el = {
    id: genId(),
    type: 'equation',
    latex: '\\int_a^b f(x)\\,dx',
    x: (vx + 50 + Math.round(Math.random() * 200)) / boardZoom,
    y: (vy + 50 + Math.round(Math.random() * 150)) / boardZoom,
    w: 300,
    h: 80
  };
  board.elements.push(el);
  save();
  renderBoardContent();
  openBoardEquationEditor(board.id, el.id);
}

function openBoardEquationEditor(boardId, elId) {
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return;
  var el = board.elements.find(function(e) { return e.id === elId; });
  if (!el || el.type !== 'equation') return;
  openLatexEditorForBoard(boardId, elId, el.latex || '');
}

function openLatexEditorForBoard(boardId, elId, latex) {
  var overlay = document.createElement('div');
  overlay.className = 'dialog-overlay';
  overlay.style.display = 'flex';
  overlay.innerHTML =
    '<div class="dialog" style="min-width:400px;max-width:600px;">' +
    '<h3>' + t('equationEditor') + '</h3>' +
    '<div class="field"><label>' + t('equationPlaceholder') + '</label>' +
    '<textarea id="eqEditorInput" spellcheck="false">' + escapeHtml(latex || '') + '</textarea></div>' +
    '<div class="field"><label>' + t('latexPreview') + '</label>' +
    '<div id="eqEditorPreview">' + (latex ? _renderLatex(latex, true) : '') + '</div></div>' +
    '<div id="eqEditorError"></div>' +
    '<div class="dialog-actions">' +
    '<button class="btn" id="eqEditorCancelBtn">' + t('cancel') + '</button>' +
    '<button class="btn btn-primary" id="eqEditorSaveBtn">' + t('save') + '</button></div></div>';
  document.body.appendChild(overlay);

  var input = document.getElementById('eqEditorInput');
  var preview = document.getElementById('eqEditorPreview');
  var error = document.getElementById('eqEditorError');

  function updatePreview() {
    var val = input.value.trim();
    if (!val) { preview.innerHTML = ''; error.textContent = ''; return; }
    try {
      var rendered = katex.renderToString(val, { throwOnError: false, displayMode: true });
      preview.innerHTML = rendered;
      error.textContent = '';
    } catch(e) {
      error.textContent = t('equationError');
    }
  }
  input.addEventListener('input', updatePreview);
  document.getElementById('eqEditorCancelBtn').addEventListener('click', function() {
    document.body.removeChild(overlay);
  });
  document.getElementById('eqEditorSaveBtn').addEventListener('click', function() {
    var newLatex = input.value.trim();
    if (boardId && elId) {
      var board = state.boards.find(function(b) { return b.id === boardId; });
      if (board) {
        var eqEl = board.elements.find(function(e) { return e.id === elId; });
        if (eqEl) {
          eqEl.latex = newLatex;
          eqEl.scale = undefined; /* reset scale on edit, re-auto-size */
          save();
          renderBoardContent();
        }
      }
    }
    document.body.removeChild(overlay);
  });
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) document.body.removeChild(overlay);
  });
  setTimeout(function() { input.focus(); input.select(); }, 100);
}

function openLatexEditorForPostit(boardId, postitId, latex, isBlock) {
  var overlay = document.createElement('div');
  overlay.className = 'dialog-overlay';
  overlay.style.display = 'flex';
  overlay.innerHTML =
    '<div class="dialog" style="min-width:400px;max-width:600px;">' +
    '<h3>' + t('equationEditor') + '</h3>' +
    '<div class="field"><label>' + t('equationPlaceholder') + '</label>' +
    '<textarea id="eqEditorInput" spellcheck="false">' + escapeHtml(latex || '') + '</textarea></div>' +
    '<div class="field"><label>' + t('latexPreview') + '</label>' +
    '<div id="eqEditorPreview">' + (latex ? _renderLatex(latex, isBlock) : '') + '</div></div>' +
    '<div id="eqEditorError"></div>' +
    '<div class="dialog-actions">' +
    '<button class="btn" id="eqEditorCancelBtn">' + t('cancel') + '</button>' +
    '<button class="btn btn-primary" id="eqEditorSaveBtn">' + t('save') + '</button></div></div>';
  document.body.appendChild(overlay);

  var input = document.getElementById('eqEditorInput');
  var preview = document.getElementById('eqEditorPreview');
  var error = document.getElementById('eqEditorError');

  function updatePreview() {
    var val = input.value.trim();
    if (!val) { preview.innerHTML = ''; error.textContent = ''; return; }
    try {
      var rendered = katex.renderToString(val, { throwOnError: false, displayMode: !!isBlock });
      preview.innerHTML = rendered;
      error.textContent = '';
    } catch(e) {
      error.textContent = t('equationError');
    }
  }
  input.addEventListener('input', updatePreview);
  document.getElementById('eqEditorCancelBtn').addEventListener('click', function() {
    document.body.removeChild(overlay);
  });
  document.getElementById('eqEditorSaveBtn').addEventListener('click', function() {
    var newLatex = input.value.trim();
    if (boardId && postitId) {
      var board = state.boards.find(function(b) { return b.id === boardId; });
      if (board) {
        var p = board.postits.find(function(p) { return p.id === postitId; });
        if (p) {
          var pattern = isBlock ? /(\$\$[\s\S]*?\$\$)/ : /\$[^\n$]+?\$/;
          var existing = p.text || '';
          var replaced = false;
          var newText = existing.replace(pattern, function(match) {
            if (!replaced) { replaced = true; return isBlock ? '$$\n' + newLatex + '\n$$' : '$' + newLatex + '$'; }
            return match;
          });
          if (replaced) p.text = newText;
          else p.text = existing + (isBlock ? '\n$$\n' + newLatex + '\n$$\n' : ' $' + newLatex + '$ ');
          save();
          renderBoardContent();
        }
      }
    }
    document.body.removeChild(overlay);
  });
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) document.body.removeChild(overlay);
  });
  setTimeout(function() { input.focus(); input.select(); }, 100);
}

function deleteBoardElement(boardId, elId) {
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return;
  var removed = null;
  board.elements = (board.elements || []).filter(function(el) {
    if (el.id === elId) removed = el;
    return el.id !== elId;
  });
  board.connections = (board.connections || []).filter(function(c) {
    return c.from !== elId && c.to !== elId;
  });
  save();
  renderBoardContent();
  /* Limpiar blob URL cacheados */
  if (removed && removed.ref && _mediaBlobUrls[removed.ref]) {
    URL.revokeObjectURL(_mediaBlobUrls[removed.ref]);
    delete _mediaBlobUrls[removed.ref];
  }
}

function duplicateBoardElement(boardId, elId) {
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return;
  var src = board.elements.find(function(el) { return el.id === elId; });
  if (!src) return;
  var copy = {
    id: genId(),
    type: src.type,
    ref: src.ref,
    x: src.x + 30,
    y: src.y + 30,
    w: src.w,
    h: src.h,
    origWidth: src.origWidth,
    origHeight: src.origHeight,
    duration: src.duration,
    latex: src.latex
  };
  board.elements.push(copy);
  save();
  renderBoardContent();
}

function updateBoardElementPosition(boardId, elId, x, y) {
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return;
  var el = board.elements.find(function(e) { return e.id === elId; });
  if (el) { el.x = Math.max(0, x); el.y = Math.max(0, y); save(); }
}

function updateBoardElementSize(boardId, elId, w, h) {
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return;
  var el = board.elements.find(function(e) { return e.id === elId; });
  if (el) { el.w = Math.max(40, w); el.h = Math.max(40, h); save(); }
}

function changeBoardElementZIndex(boardId, elId, action) {
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return;
  var elements = board.elements || [];
  var idx = -1;
  elements.forEach(function(el, i) { if (el.id === elId) idx = i; });
  if (idx < 0) return;
  var el = elements.splice(idx, 1)[0];
  if (action === 'front') elements.push(el);
  else elements.unshift(el);
  save();
  renderBoardContent();
}

function copyBoardElementToClipboard(boardId, elId) {
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return;
  var src = board.elements.find(function(el) { return el.id === elId; });
  if (!src) return;
  _boardElementClipboard = {
    type: src.type,
    ref: src.ref,
    w: src.w,
    h: src.h,
    origWidth: src.origWidth,
    origHeight: src.origHeight,
    duration: src.duration,
    latex: src.latex
  };
}

function pasteBoardElementFromClipboard(boardId) {
  if (!_boardElementClipboard) return;
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return;
  if (!board.elements) board.elements = [];
  var el = {
    id: genId(),
    type: _boardElementClipboard.type,
    ref: _boardElementClipboard.ref,
    x: 50,
    y: 50,
    w: _boardElementClipboard.w,
    h: _boardElementClipboard.h,
    origWidth: _boardElementClipboard.origWidth,
    origHeight: _boardElementClipboard.origHeight,
    duration: _boardElementClipboard.duration,
    latex: _boardElementClipboard.latex
  };
  board.elements.push(el);
  save();
  renderBoardContent();
}

/* Insertar imagen en tablero */
function triggerBoardImageInput() {
  document.getElementById('boardImageInput').value = '';
  document.getElementById('boardImageInput').click();
}

function insertBoardImage(input) {
  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  ImageConverter.toWebP(file, 0.85).then(function(result) {
    var ref = 'imagenes/' + generateImageId() + '.webp';
    return ImageManager.save(ref, result.base64).then(function() {
      addBoardElement('image', ref, result.width, result.height, { origWidth: result.width, origHeight: result.height });
    });
  }).catch(function(err) {
    console.error('Error inserting board image:', err);
  });
}

/* Insertar audio en tablero */
function triggerBoardAudioInput() {
  document.getElementById('boardAudioInput').value = '';
  document.getElementById('boardAudioInput').click();
}

function insertBoardAudio(input) {
  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  AudioConverter.toBase64(file).then(function(base64) {
    var ext = file.name.split('.').pop().toLowerCase();
    var ref = 'audios/' + generateImageId() + '.' + ext;
    return ImageManager.save(ref, base64).then(function() {
      return AudioConverter.getDuration(file).then(function(dur) {
        addBoardElement('audio', ref, 140, 140, { duration: Math.round(dur) });
      }).catch(function() {
        addBoardElement('audio', ref, 140, 140);
      });
    });
  }).catch(function(err) {
    console.error('Error inserting board audio:', err);
  });
}

/* Insertar video en tablero */
function triggerBoardVideoInput() {
  document.getElementById('boardVideoInput').value = '';
  document.getElementById('boardVideoInput').click();
}

function insertBoardVideo(input) {
  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  VideoConverter.toBase64(file).then(function(base64) {
    var ext = file.name.split('.').pop().toLowerCase();
    var ref = 'videos/' + generateImageId() + '.' + ext;
    return ImageManager.save(ref, base64).then(function() {
      return VideoConverter.getDimensions(file).then(function(dims) {
        addBoardElement('video', ref, dims.width, dims.height, { origWidth: dims.width, origHeight: dims.height });
      }).catch(function() {
        addBoardElement('video', ref, 320, 240);
      });
    });
  }).catch(function(err) {
    console.error('Error inserting board video:', err);
  });
}

/* Insertar audio grabado como elemento de tablero */
function addBoardAudioElement(ref) {
  addBoardElement('audio', ref, 140, 140);
}

/* Insertar audio grabado como item de nota */
function addAudioItemToNote(ref) {
  var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
  if (!note) return;
  note.items.push({ id: genId(), type: 'audio', ref: ref });
  save();
  renderNoteContent();
}

/* Insertar audio importado en nota */
function insertAudio(input) {
  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  AudioConverter.toBase64(file).then(function(base64) {
    var ext = file.name.split('.').pop().toLowerCase();
    var ref = 'audios/' + generateImageId() + '.' + ext;
    return ImageManager.save(ref, base64).then(function() {
      return addAudioItem(ref);
    });
  }).catch(function(err) {
    console.error('Error inserting audio:', err);
  });
}

function addAudioItem(ref) {
  var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
  if (!note) return;
  note.items.push({ id: genId(), type: 'audio', ref: ref });
  save();
  renderNoteContent();
}

function addAudioItemAtCursor(ref) {
  var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
  if (!note) return;
  var idx = -1;
  if (activeItemId !== null) {
    note.items.forEach(function(it, i) { if (it.id === activeItemId) idx = i; });
  }
  if (idx >= 0) {
    note.items.splice(idx + 1, 0, { id: genId(), type: 'audio', ref: ref });
  } else {
    note.items.push({ id: genId(), type: 'audio', ref: ref });
  }
  save();
  renderNoteContent();
}

/* Insertar video en nota (futuro - por ahora solo tablero) */
function insertVideo(input) {
  /* Por ahora placeholder - el video solo se usa en tableros */
}

/* Funciones para overlay de tamaño completo */
function showFullsizeView(contentHtml) {
  document.getElementById('fullsizeContent').innerHTML = contentHtml;
  showDialog('fullsizeOverlay');
}

function openBoardElementFullsize(boardId, elId) {
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return;
  var el = board.elements.find(function(e) { return e.id === elId; });
  if (!el) return;
  var ref = el.ref;
  if (el.type === 'image') {
    ImageManager.read(ref).then(function(base64) {
      if (!base64) return;
      var mime = ImageConverter.getMimeFromRef(ref);
      var src = 'data:' + mime + ';base64,' + base64;
      showFullsizeView('<img src="' + src + '" alt="" />');
    });
  } else if (el.type === 'video') {
    /* Pausar video en miniatura si se está reproduciendo */
    var thumbEl = document.querySelector('.board-element[data-id="' + elId + '"] video');
    if (thumbEl && !thumbEl.paused) { thumbEl.pause(); thumbEl._playRequested = false; }
    var url = _mediaBlobUrls[ref];
    if (url) {
      showFullsizeView('<video src="' + url + '" controls autoplay style="max-width:100%;max-height:90vh;"></video>');
    } else {
      ImageManager.read(ref).then(function(base64) {
        if (!base64) return;
        var mime = ImageConverter.getMimeFromRef(ref);
        var blob = _base64ToBlob(base64, mime);
        url = URL.createObjectURL(blob);
        _mediaBlobUrls[ref] = url;
        showFullsizeView('<video src="' + url + '" controls autoplay style="max-width:100%;max-height:90vh;"></video>');
      });
    }
  }
}

function closeFullsizeView() {
  closeDialog('fullsizeOverlay');
  var content = document.getElementById('fullsizeContent');
  /* Pausar cualquier video */
  var video = content.querySelector('video');
  if (video) video.pause();
  content.innerHTML = '';
}

/* Conexiones mejoradas: dibujar curva Bezier desde borde más cercano */
function updateImprovedConnections() {
  var wrap = document.querySelector('.board-canvas-wrap');
  if (!wrap) return;
  var svg = wrap.querySelector('svg.connections');
  if (!svg) return;
  var board = state.boards.find(function(b) { return b.id === state.activeBoardId; });
  if (!board) return;
  var allGroups = svg.querySelectorAll('.connection-group');
  board.connections.forEach(function(conn, i) {
    if (!allGroups[i]) return;
    var fromEl = document.querySelector('[data-id="' + conn.from + '"]');
    var toEl = document.querySelector('[data-id="' + conn.to + '"]');
    if (!fromEl || !toEl) return;
    var fRect = {
      left: parseFloat(fromEl.style.left) || 0,
      top: parseFloat(fromEl.style.top) || 0,
      w: fromEl.offsetWidth || 180,
      h: fromEl.offsetHeight || 180
    };
    var tRect = {
      left: parseFloat(toEl.style.left) || 0,
      top: parseFloat(toEl.style.top) || 0,
      w: toEl.offsetWidth || 180,
      h: toEl.offsetHeight || 180
    };
    /* Encontrar bordes más cercanos */
    var result = _findClosestEdges(fRect, tRect);
    var fx = result.fx, fy = result.fy, tx = result.tx, ty = result.ty;
    var dx = tx - fx;
    var dy = ty - fy;
    var dist = Math.sqrt(dx * dx + dy * dy);
    /* Control points con caída gravitacional */
    var sag = Math.min(dist * 0.15, 60);
    var cx1 = fx + dx * 0.4;
    var cy1 = fy + dy * 0.3 + sag;
    var cx2 = fx + dx * 0.6;
    var cy2 = fy + dy * 0.7 + sag;
    var d = 'M ' + fx + ',' + fy + ' C ' + cx1 + ',' + cy1 + ' ' + cx2 + ',' + cy2 + ' ' + tx + ',' + ty;
    var line = allGroups[i].querySelector('.connection-line');
    if (line) line.setAttribute('d', d);
    var hoverLine = allGroups[i].querySelector('.connection-line-hover');
    if (hoverLine) hoverLine.setAttribute('d', d);
    /* Pines en los extremos */
    var pinSvg = wrap.querySelector('svg.board-pins');
    if (pinSvg) {
      var pins = pinSvg.querySelectorAll('.connection-pin');
      var pi = i * 2;
      if (pins[pi]) { pins[pi].setAttribute('cx', fx); pins[pi].setAttribute('cy', fy); }
      if (pins[pi + 1]) { pins[pi + 1].setAttribute('cx', tx); pins[pi + 1].setAttribute('cy', ty); }
    }
  });
}

/* Encuentra los bordes más cercanos entre dos rectángulos */
function _findClosestEdges(r1, r2) {
  var r1cx = r1.left + r1.w / 2, r1cy = r1.top + r1.h / 2;
  var r2cx = r2.left + r2.w / 2, r2cy = r2.top + r2.h / 2;
  /* 8 puntos candidatos: 4 esquinas + 4 centros de borde */
  var pts1 = [
    { x: r1.left, y: r1.top }, { x: r1.left + r1.w, y: r1.top },
    { x: r1.left, y: r1.top + r1.h }, { x: r1.left + r1.w, y: r1.top + r1.h },
    { x: r1.left + r1.w / 2, y: r1.top }, { x: r1.left + r1.w, y: r1.top + r1.h / 2 },
    { x: r1.left + r1.w / 2, y: r1.top + r1.h }, { x: r1.left, y: r1.top + r1.h / 2 }
  ];
  var pts2 = [
    { x: r2.left, y: r2.top }, { x: r2.left + r2.w, y: r2.top },
    { x: r2.left, y: r2.top + r2.h }, { x: r2.left + r2.w, y: r2.top + r2.h },
    { x: r2.left + r2.w / 2, y: r2.top }, { x: r2.left + r2.w, y: r2.top + r2.h / 2 },
    { x: r2.left + r2.w / 2, y: r2.top + r2.h }, { x: r2.left, y: r2.top + r2.h / 2 }
  ];
  var minDist = Infinity, best = { fx: r1cx, fy: r1cy, tx: r2cx, ty: r2cy };
  for (var i = 0; i < pts1.length; i++) {
    for (var j = 0; j < pts2.length; j++) {
      var dx = pts2[j].x - pts1[i].x;
      var dy = pts2[j].y - pts1[i].y;
      var dist = dx * dx + dy * dy;
      if (dist < minDist) {
        minDist = dist;
        best.fx = pts1[i].x; best.fy = pts1[i].y;
        best.tx = pts2[j].x; best.ty = pts2[j].y;
      }
    }
  }
  return best;
}

function renderBoardContent() {
  var container = document.getElementById('boardContent');
  var board = state.boards.find(function(b) { return b.id === state.activeBoardId; });
  if (!board) {
    var html = '<div class="selection-view"><div class="selection-header"><h2>' + t('boards') + '</h2></div><div class="selection-grid">';
    if (state.boards.length === 0) {
      html += '<div class="selection-empty">' + t('noBoards') + '</div>';
    } else {
      state.boards.forEach(function(b) {
        var pc = (b.postits ? b.postits.length : 0) + ((b.elements && b.elements.length) || 0);
        var locked = b.pwdHash && !unlockedIds['b' + b.id];
        var lock = locked ? '<span class="card-lock">&#x1f512;</span>' : '';
        var preview = locked ? t('passwordProtected') : pc + ' elemento' + (pc !== 1 ? 's' : '');
        html += '<div class="card" data-board-id="' + b.id + '" onclick="selectBoard(' + b.id + ')">' +
          '<span class="card-drag-handle" onclick="event.stopPropagation()">&#x2630;</span>' +
          lock +
          '<span class="card-date">' + fmtDate(b.createdAt) + '</span>' +
          '<div class="card-title">' + escapeHtml(b.name) + '</div>' +
          '<div class="card-preview">' + preview + '</div></div>';
      });
    }
    html += '</div></div>';
    var gridScroll = document.querySelector('.selection-grid');
    var savedGridScroll = gridScroll ? gridScroll.scrollTop : 0;
    container.innerHTML = html;
    updateBackBtn();
    if (savedGridScroll > 0) { var ng = document.querySelector('.selection-grid'); if (ng) ng.scrollTop = savedGridScroll; }
    return;
  }
  updateBackBtn();

  // Guardar scroll antes de re-renderizar
  var oldWrap = document.querySelector('.board-canvas-wrap');
  var sx = oldWrap ? oldWrap.scrollLeft : 0;
  var sy = oldWrap ? oldWrap.scrollTop : 0;

  // Calcular dimensiones del canvas infinito
  var MIN_W = 3000, MIN_H = 3000;
  var maxX = MIN_W, maxY = MIN_H;
  (board.postits || []).forEach(function(p) {
    var right = p.x + (p.w || 180) + 600;
    var bottom = p.y + (p.h || 180) + 600;
    if (right > maxX) maxX = right;
    if (bottom > maxY) maxY = bottom;
  });
  (board.elements || []).forEach(function(el) {
    var right = el.x + (el.w || 200) + 600;
    var bottom = el.y + (el.h || 180) + 600;
    if (right > maxX) maxX = right;
    if (bottom > maxY) maxY = bottom;
  });
  maxX = Math.ceil(maxX / 100) * 100;
  maxY = Math.ceil(maxY / 100) * 100;

  var html = '<div class="board-toolbar">' + (board.pwdHash ? '<span style="font-size:14px;opacity:0.4;margin-right:4px;">&#x1f512;</span>' : '');
  html += '<div class="color-group">';
  POSTIT_COLORS.forEach(function(c) {
    html += '<button class="color-btn" style="background:' + COLOR_VALS[c] + '" onclick="addPostit(\'' + c + '\')" title="' + t('postit') + ' ' + c + '"></button>';
  });
  html += '</div>';
  html += '<span class="sep"></span>';
  html += '<button class="btn btn-icon" onclick="triggerBoardImageInput()" title="' + t('insertBoardImage') + '">&#x1f304;</button>';
  html += '<button class="btn btn-icon" onclick="triggerBoardAudioInput()" title="' + t('insertBoardAudio') + '">&#x1F3A4;</button>';
  html += '<button class="btn btn-icon" onclick="triggerBoardVideoInput()" title="' + t('insertBoardVideo') + '">&#x1F3AC;</button>';
  html += '<button class="btn btn-icon" onclick="addBoardEquation()" title="' + t('boardInsertEquation') + '" style="font-weight:bold;font-size:15px;">&#x2211;</button>';
  html += '<span style="flex:1;text-align:center;">';
  html += '<button class="btn" onclick="resetBoardZoom()" title="' + t('resetZoom') + '" style="font-size:11px;">' + Math.round(boardZoom * 100) + '%</button>';
  html += '</span>';
  html += '</div>';
  html += '<div class="board-outer-wrap"><div class="board-canvas-wrap bg-' + board.boardBg + (state.boardShowShadows === false ? ' board-no-shadows' : '') + (state.boardShowAnimations === false ? ' no-animations' : '') + '" data-board-id="' + board.id + '">';
  var vz = boardZoom;
  html += '<div class="board-zoom-layer" style="width:' + (maxX * vz) + 'px;height:' + (maxY * vz) + 'px;">';
  html += '<div class="board-canvas-inner" style="width:' + maxX + 'px;height:' + maxY + 'px;transform-origin:0 0;transform:scale(' + vz + ');"><div class="connect-overlay"></div>';
  html += '<svg class="connections">';
  board.connections.forEach(function(conn) {
    html += '<g class="connection-group" onclick="deleteConnection(' + board.id + ', ' + conn.from + ', ' + conn.to + ')" style="cursor:pointer;">';
    html += '<path class="connection-line" data-from="' + conn.from + '" data-to="' + conn.to + '" />';
    html += '<path class="connection-line-hover" data-from="' + conn.from + '" data-to="' + conn.to + '" />';
    html += '</g>';
  });
  html += '</svg>';
  html += '<svg class="board-pins">';
  board.connections.forEach(function(conn) {
    html += '<circle class="connection-pin" r="8" data-from="' + conn.from + '" data-to="' + conn.to + '" />';
    html += '<circle class="connection-pin" r="8" data-from="' + conn.from + '" data-to="' + conn.to + '" />';
  });
  html += '</svg>';
  /* Render post-its existentes */
  (board.postits || []).forEach(function(p) {
    html += '<div class="postit ' + p.color + '" data-id="' + p.id + '" style="left:' + p.x + 'px;top:' + p.y + 'px;width:' + p.w + 'px;height:' + p.h + 'px;" onclick="if(event.target.closest(\'.postit-close\') || event.target.closest(\'.postit-color-dot\'))return;startConnection(' + p.id + ')">';
    html += '<div class="postit-header">';
    POSTIT_COLORS.forEach(function(c) {
      html += '<span class="postit-color-dot ' + (c === p.color ? 'active' : '') + '" style="background:' + COLOR_VALS[c] + '" onclick="event.stopPropagation();changePostitColor(' + board.id + ', ' + p.id + ', \'' + c + '\')"></span>';
    });
    html += '</div>';
    html += '<button class="postit-close" onclick="deletePostit(' + board.id + ', ' + p.id + ')">&times;</button>';
    html += '<div class="postit-body"><div contenteditable="true" class="postit-text" data-placeholder="' + t('itemPlaceholder') + '" oninput="updatePostitText(' + board.id + ', ' + p.id + ', this.innerHTML)">' + renderLatexInHtml(parseNoteLinks(p.text || '')) + '</div></div>';
    html += '</div>';
  });
  /* Render elementos multimedia */
  (board.elements || []).forEach(function(el) {
    if (el.type === 'image') {
      html += '<div class="board-element board-image" data-id="' + el.id + '" data-type="image" style="left:' + el.x + 'px;top:' + el.y + 'px;width:' + el.w + 'px;height:' + el.h + 'px;" onclick="if(event.target.closest(\'.edit-handle,.board-el-close,button\'))return;startConnection(' + el.id + ')" ondblclick="event.stopPropagation();openBoardElementFullsize(' + board.id + ',' + el.id + ')">';
      html += '<img src="" data-ref="' + escapeHtml(el.ref) + '" alt="" />';
      html += '<button class="board-el-close" onclick="deleteBoardElement(' + board.id + ', ' + el.id + ')">&times;</button>';
      
      html += '</div>';
    } else if (el.type === 'audio') {
      html += '<div class="board-element board-audio" data-id="' + el.id + '" data-type="audio" style="left:' + el.x + 'px;top:' + el.y + 'px;width:' + el.w + 'px;height:' + el.h + 'px;" onclick="if(event.target.closest(\'.board-el-close,.audio-player,button\'))return;startConnection(' + el.id + ')">';
      html += '<button class="board-el-close" onclick="deleteBoardElement(' + board.id + ', ' + el.id + ')">&times;</button>';
      html += '<div class="audio-mic-icon">&#x1F399;</div>';
      html += '<div class="board-audio-player" data-ref="' + escapeHtml(el.ref) + '"></div>';
      html += '</div>';
    } else if (el.type === 'video') {
      html += '<div class="board-element board-video" data-id="' + el.id + '" data-type="video" style="left:' + el.x + 'px;top:' + el.y + 'px;width:' + el.w + 'px;height:' + el.h + 'px;" onclick="if(event.target.closest(\'.edit-handle,.board-el-close,button\'))return;startConnection(' + el.id + ')" ondblclick="event.stopPropagation();openBoardElementFullsize(' + board.id + ',' + el.id + ')">';
      html += '<video src="" data-ref="' + escapeHtml(el.ref) + '" preload="metadata" playsinline></video>';
      html += '<div class="board-video-overlay">';
      html += '<button class="bv-play" data-board-id="' + board.id + '" data-el-id="' + el.id + '">&#x25B6;</button>';
      html += '<button class="bv-restart" data-board-id="' + board.id + '" data-el-id="' + el.id + '">&#x21BA;</button>';
      html += '</div>';
      html += '<button class="board-el-close" onclick="deleteBoardElement(' + board.id + ', ' + el.id + ')">&times;</button>';
      
      html += '</div>';
    } else if (el.type === 'equation') {
      var eqHtml = el.latex ? _renderLatex(el.latex, true) : '';
      html += '<div class="board-element board-equation" data-id="' + el.id + '" data-type="equation" style="left:' + el.x + 'px;top:' + el.y + 'px;width:' + el.w + 'px;height:' + el.h + 'px;" onclick="if(event.target.closest(\'.board-el-close,button\'))return;startConnection(' + el.id + ')">';
      html += '<div class="board-equation-content">' + eqHtml + '</div>';
      html += '<button class="board-el-close" onclick="deleteBoardElement(' + board.id + ', ' + el.id + ')">&times;</button>';
      html += '</div>';
    }
  });
  html += '</div></div></div></div>';
  container.innerHTML = html;
  applyBoardZoom();
  /* Auto-size equation elements to fit content */
  var eqEls = container.querySelectorAll('.board-equation');
  [].forEach.call(eqEls, function(eqEl) {
    var content = eqEl.querySelector('.board-equation-content');
    if (!content) return;
    var elId = Number(eqEl.getAttribute('data-id'));
    var elData = null;
    if (elId) {
      var b = state.boards.find(function(x) { return x.id === state.activeBoardId; });
      if (b) { elData = b.elements.find(function(e) { return e.id === elId; }); }
    }
    /* Temporarily remove fixed sizes to measure natural dimensions */
    content.style.width = 'auto';
    eqEl.style.width = 'auto';
    eqEl.style.height = 'auto';
    var naturalW = eqEl.scrollWidth;
    var naturalH = eqEl.scrollHeight;
    var padding = 24;
    var newW = Math.max(100, naturalW);
    var newH = Math.max(50, naturalH);
    if (elData && elData.type === 'equation' && elData.scale && elData.scale < 1) {
      /* User-resized — keep stored container size, apply scale */
      eqEl.style.width = elData.w + 'px';
      eqEl.style.height = elData.h + 'px';
    } else {
      /* Auto-size to natural dimensions */
      eqEl.style.width = newW + 'px';
      eqEl.style.height = newH + 'px';
      if (elData && elData.type === 'equation') {
        elData.w = newW;
        elData.h = newH;
      }
    }
    /* Store natural content dimensions for resize scaling */
    content.style.width = '';
    var cw = content.scrollWidth;
    var ch = content.scrollHeight;
    content.setAttribute('data-natural-w', cw);
    content.setAttribute('data-natural-h', ch);
    content.style.width = cw + 'px';
    content.style.height = ch + 'px';
    if (elData && elData.type === 'equation' && elData.scale && elData.scale < 1) {
      _adjustBoardEquationScale(eqEl, elData.scale);
    }
  });
  /* Cargar imágenes de elementos multimedia */
  loadBoardElementImages();
  loadBoardAudios();
  loadBoardVideos();
  setTimeout(function() {
    var wrap = document.querySelector('.board-canvas-wrap');
    if (wrap) { wrap.scrollLeft = sx; wrap.scrollTop = sy; }
    updateImprovedConnections();
  }, 50);
}

/* Cargar imágenes de elementos multimedia en tablero */
function loadBoardElementImages() {
  var imgs = document.querySelectorAll('.board-image img[data-ref]');
  [].forEach.call(imgs, function(img) {
    var ref = img.getAttribute('data-ref');
    if (!ref) return;
    img.removeAttribute('data-ref');
    ImageManager.read(ref).then(function(base64) {
      if (base64) {
        var mime = ImageConverter.getMimeFromRef(ref);
        img.src = 'data:' + mime + ';base64,' + base64;
      }
    }).catch(function(err) {
      console.error('Error loading board image:', ref, err);
    });
  });
}

/* Cargar audios en elementos de tablero */
function loadBoardAudios() {
  var containers = document.querySelectorAll('.board-audio-player[data-ref]');
  [].forEach.call(containers, function(container) {
    var ref = container.getAttribute('data-ref');
    if (!ref) return;
    container.removeAttribute('data-ref');
    createAudioPlayer(ref, container, {
      onend: function() {
        /* Al terminar, vuelve al inicio (ya manejado en createAudioPlayer) */
      }
    });
  });
}

/* Cargar videos en elementos de tablero */
function loadBoardVideos() {
  var videos = document.querySelectorAll('.board-video video[data-ref]');
  [].forEach.call(videos, function(videoEl) {
    var ref = videoEl.getAttribute('data-ref');
    if (!ref) return;
    videoEl.removeAttribute('data-ref');
    ImageManager.read(ref).then(function(base64) {
      if (!base64) return;
      var mime = ImageConverter.getMimeFromRef(ref);
      var blob = _base64ToBlob(base64, mime);
      var url = URL.createObjectURL(blob);
      _mediaBlobUrls[ref] = url;
      videoEl.src = url;
      videoEl._playRequested = false;

      var boardEl = videoEl.closest('.board-element');
      var playBtn = boardEl ? boardEl.querySelector('.bv-play') : null;
      var restartBtn = boardEl ? boardEl.querySelector('.bv-restart') : null;

      function syncIcon() {
        if (!playBtn) return;
        playBtn.innerHTML = videoEl.paused ? '&#x25B6;' : '&#x23F8;';
      }
      function doPlay() {
        if (!videoEl.paused || videoEl._playRequested) return;
        videoEl._playRequested = true;
        videoEl.play().then(function() { videoEl._playRequested = false; syncIcon(); }).catch(function() { videoEl._playRequested = false; syncIcon(); });
        syncIcon();
      }
      function doPause() {
        videoEl._playRequested = false;
        videoEl.pause();
        syncIcon();
      }

      /* Botón overlay play/pausa */
      if (playBtn) {
        playBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          if (videoEl.paused) doPlay(); else doPause();
        });
      }

      /* Botón overlay reiniciar */
      if (restartBtn) {
        restartBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          videoEl._playRequested = false;
          videoEl.pause();
          videoEl.currentTime = 0;
          syncIcon();
        });
      }

      /* Sincronizar icono con eventos nativos */
      videoEl.addEventListener('play', syncIcon);
      videoEl.addEventListener('pause', syncIcon);
      videoEl.addEventListener('ended', function() {
        videoEl.currentTime = 0;
        videoEl._playRequested = false;
        syncIcon();
      });
    });
  });
}

function updateConnectionLines() {
  var wrap = document.querySelector('.board-canvas-wrap');
  if (!wrap) return;
  var svg = wrap.querySelector('svg.connections');
  var pinSvg = wrap.querySelector('svg.board-pins');
  if (!svg || !pinSvg) return;
  var board = state.boards.find(function(b) { return b.id === state.activeBoardId; });
  if (!board) return;
  var groups = svg.querySelectorAll('.connection-group');
  var pins = pinSvg.querySelectorAll('.connection-pin');
  board.connections.forEach(function(conn, i) {
    var fromEl = document.querySelector('.postit[data-id="' + conn.from + '"]') || document.querySelector('.board-element[data-id="' + conn.from + '"]');
    var toEl = document.querySelector('.postit[data-id="' + conn.to + '"]') || document.querySelector('.board-element[data-id="' + conn.to + '"]');
    if (fromEl && toEl && groups[i]) {
      var fx = parseInt(fromEl.style.left) + fromEl.offsetWidth / 2;
      var fy = parseInt(fromEl.style.top);
      var tx = parseInt(toEl.style.left) + toEl.offsetWidth / 2;
      var ty = parseInt(toEl.style.top);
      groups[i].querySelector('.connection-line').setAttribute('d', 'M' + fx + ',' + fy + ' L' + tx + ',' + ty);
      var pi = i * 2;
      if (pins[pi]) { pins[pi].setAttribute('cx', fx); pins[pi].setAttribute('cy', fy); }
      if (pins[pi + 1]) { pins[pi + 1].setAttribute('cx', tx); pins[pi + 1].setAttribute('cy', ty); }
    }
  });
}


// Post-it and board element dragging
document.addEventListener('mousedown', function(e) {
  var el = null;
  var type = 'postit';
  var header = e.target.closest('.postit-header');
  if (header) {
    el = header.closest('.postit');
    if (!el) return;
    if (e.target.tagName === 'TEXTAREA') return;
  } else {
    el = e.target.closest('.board-element');
    if (!el) return;
    type = 'element';
    if (e.target.closest('.edit-handle, .board-el-close, .audio-player, button')) return;
  }
  var wrap = el.closest('.board-canvas-wrap');
  if (!wrap) return;
  var boardId = wrap.dataset.boardId;
  if (!boardId) return;
  postitDragState = {
    boardId: boardId, elementId: el.dataset.id, type: type,
    startX: e.clientX, startY: e.clientY,
    origX: parseInt(el.style.left) || 0, origY: parseInt(el.style.top) || 0,
    el: el
  };
  el.classList.add('dragging');
  e.preventDefault();
});

document.addEventListener('mousemove', function(e) {
  if (!postitDragState) return;
  var dx = (e.clientX - postitDragState.startX) / boardZoom;
  var dy = (e.clientY - postitDragState.startY) / boardZoom;
  var nx = Math.max(0, postitDragState.origX + dx);
  var ny = Math.max(0, postitDragState.origY + dy);
  postitDragState.el.style.left = nx + 'px';
  postitDragState.el.style.top = ny + 'px';
  updateImprovedConnections();
});

document.addEventListener('mouseup', function(e) {
  if (!postitDragState) return;
  postitDragState.el.classList.remove('dragging');
  var board = state.boards.find(function(b) { return b.id === Number(postitDragState.boardId); });
  if (board) {
    if (postitDragState.type === 'element') {
      var el = board.elements.find(function(e) { return e.id === Number(postitDragState.elementId); });
      if (el) { el.x = parseInt(postitDragState.el.style.left); el.y = parseInt(postitDragState.el.style.top); }
    } else {
      var p = board.postits.find(function(p) { return p.id === Number(postitDragState.elementId); });
      if (p) { p.x = parseInt(postitDragState.el.style.left); p.y = parseInt(postitDragState.el.style.top); }
    }
  }
  save();
  postitDragState = null;
});

// Edit mode for board elements (8-handle resize)
var _editModeElementId = null;

function toggleEditMode(boardId, elId) {
  if (_editModeElementId === elId) {
    _exitEditMode();
    return;
  }
  _exitEditMode();
  _editModeElementId = elId;
  var el = document.querySelector('.board-element[data-id="' + elId + '"]');
  if (!el) { _editModeElementId = null; return; }
  el.classList.add('editing');
  var dirs = ['nw','n','ne','e','se','s','sw','w'];
  dirs.forEach(function(dir) {
    var h = document.createElement('div');
    h.className = 'edit-handle';
    h.setAttribute('data-dir', dir);
    el.appendChild(h);
  });
}

function _exitEditMode() {
  if (_editModeElementId) {
    var el = document.querySelector('.board-element[data-id="' + _editModeElementId + '"]');
    if (el) {
      el.classList.remove('editing');
      var handles = el.querySelectorAll('.edit-handle');
      Array.prototype.forEach.call(handles, function(h) { h.remove(); });
    }
  }
  _editModeElementId = null;
}

// Resize board elements (image/video) — dir-aware, 8 directions
var _resizeState = null;

function _startResize(clientX, clientY, el, dir) {
  var wrap = el.closest('.board-canvas-wrap');
  if (!wrap) return;
  var boardId = Number(wrap.dataset.boardId);
  var elId = Number(el.dataset.id);
  _resizeState = {
    boardId: boardId, elId: elId,
    startX: clientX, startY: clientY,
    origX: parseFloat(el.style.left) || 0,
    origY: parseFloat(el.style.top) || 0,
    origW: el.offsetWidth || 200,
    origH: el.offsetHeight || 200,
    dir: dir || 'se',
    el: el
  };
  var elData = _findBoardElement(boardId, elId);
  if (elData && elData.origWidth && elData.origHeight) {
    _resizeState.origWidth = elData.origWidth;
    _resizeState.origHeight = elData.origHeight;
  }
}

function _findBoardElement(boardId, elId) {
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return null;
  return board.elements.find(function(el) { return el.id === elId; }) || null;
}

function _doResize(clientX, clientY) {
  if (!_resizeState) return;
  var rs = _resizeState;
  var dx = (clientX - rs.startX) / boardZoom;
  var dy = (clientY - rs.startY) / boardZoom;
  var dir = rs.dir;

  var newX = rs.origX, newY = rs.origY;
  var newW = rs.origW, newH = rs.origH;

  if (dir.indexOf('e') !== -1) newW = Math.max(60, rs.origW + dx);
  if (dir.indexOf('w') !== -1) { newW = Math.max(60, rs.origW - dx); newX = rs.origX + (rs.origW - newW); }
  if (dir.indexOf('s') !== -1) newH = Math.max(60, rs.origH + dy);
  if (dir.indexOf('n') !== -1) { newH = Math.max(60, rs.origH - dy); newY = rs.origY + (rs.origH - newH); }

  /* Maintain aspect ratio for corners (dir with both a horizontal and vertical component) */
  if (rs.origWidth && rs.origHeight) {
    var isCorner = (dir.indexOf('e') !== -1 || dir.indexOf('w') !== -1) &&
                   (dir.indexOf('s') !== -1 || dir.indexOf('n') !== -1);
    if (isCorner) {
      var ratio = rs.origWidth / rs.origHeight;
      var hFromW = newW / ratio;
      var wFromH = newH * ratio;
      /* Use the dimension with larger delta */
      if (Math.abs(dx) > Math.abs(dy)) {
        newH = hFromW;
        /* If n is involved, adjust y */
        if (dir.indexOf('n') !== -1) newY = rs.origY + (rs.origH - newH);
      } else {
        newW = wFromH;
        if (dir.indexOf('w') !== -1) newX = rs.origX + (rs.origW - newW);
      }
    }
  }

  rs.el.style.left = Math.round(newX) + 'px';
  rs.el.style.top = Math.round(newY) + 'px';
  rs.el.style.width = Math.round(newW) + 'px';
  rs.el.style.height = Math.round(newH) + 'px';
}

function _endResize() {
  if (!_resizeState) return;
  var board = state.boards.find(function(b) { return b.id === _resizeState.boardId; });
  if (board) {
    var boardEl = board.elements.find(function(el) { return el.id === _resizeState.elId; });
    if (boardEl) {
      boardEl.x = parseFloat(_resizeState.el.style.left) || 0;
      boardEl.y = parseFloat(_resizeState.el.style.top) || 0;
      boardEl.w = _resizeState.el.offsetWidth || boardEl.w;
      boardEl.h = _resizeState.el.offsetHeight || boardEl.h;
      if (boardEl.type === 'equation') {
        _recalcEquationScale(_resizeState.el, boardEl);
      }
      save();
    }
  }
  _resizeState = null;
}

function _recalcEquationScale(el, data) {
  var content = el.querySelector('.board-equation-content');
  if (!content) return;
  var naturalW = Number(content.getAttribute('data-natural-w'));
  var naturalH = Number(content.getAttribute('data-natural-h'));
  if (!naturalW || !naturalH) return;
  var containerW = el.offsetWidth - 24;
  var containerH = el.offsetHeight - 24;
  if (containerW <= 0 || containerH <= 0) return;
  var scaleX = containerW / naturalW;
  var scaleY = containerH / naturalH;
  var scale = Math.min(scaleX, scaleY, 1);
  data.scale = scale < 1 ? scale : undefined;
  _adjustBoardEquationScale(el, scale);
}

function _adjustBoardEquationScale(eqEl, scale) {
  var content = eqEl.querySelector('.board-equation-content');
  if (!content) return;
  if (!scale || scale >= 1) {
    content.style.transform = '';
    content.style.width = '';
    content.style.height = '';
    eqEl.classList.remove('equation-scaled');
    return;
  }
  var naturalW = Number(content.getAttribute('data-natural-w'));
  var naturalH = Number(content.getAttribute('data-natural-h'));
  if (!naturalW || !naturalH) return;
  content.style.width = naturalW + 'px';
  content.style.height = naturalH + 'px';
  content.style.transform = 'scale(' + scale + ')';
  eqEl.classList.add('equation-scaled');
}

document.addEventListener('mousedown', function(e) {
  var handle = e.target.closest('.edit-handle');
  if (!handle) return;
  var el = handle.closest('.board-element');
  if (!el) return;
  if (el.dataset.type === 'audio') return;
  _startResize(e.clientX, e.clientY, el, handle.getAttribute('data-dir') || 'se');
  e.preventDefault();
  e.stopPropagation();
});
document.addEventListener('mousemove', function(e) {
  _doResize(e.clientX, e.clientY);
});
document.addEventListener('mouseup', function(e) {
  _endResize();
});

// Board pan (drag on empty space to scroll)
document.addEventListener('mousedown', function(e) {
  if (boardPanState) return;
  var wrap = e.target.closest('.board-canvas-wrap');
  if (!wrap) return;
  if (e.target.closest('.postit, .board-element, .connection-group, .connection-pin, .board-toolbar, button, input, textarea, [contenteditable]')) return;
  boardPanState = {
    startX: e.clientX, startY: e.clientY,
    startScrollLeft: wrap.scrollLeft, startScrollTop: wrap.scrollTop,
    wrap: wrap, active: false
  };
});
document.addEventListener('mousemove', function(e) {
  if (!boardPanState) return;
  var dx = e.clientX - boardPanState.startX;
  var dy = e.clientY - boardPanState.startY;
  if (!boardPanState.active) {
    if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
    boardPanState.active = true;
    boardPanState.wrap.classList.add('panning');
  }
  boardPanState.wrap.scrollLeft = boardPanState.startScrollLeft - dx;
  boardPanState.wrap.scrollTop = boardPanState.startScrollTop - dy;
  e.preventDefault();
});
document.addEventListener('mouseup', function(e) {
  if (!boardPanState) return;
  boardPanState.wrap.classList.remove('panning');
  boardPanState = null;
});

// Touch pan for board (Android)
document.addEventListener('touchstart', function(e) {
  if (e.touches.length !== 1 || boardPanState) return;
  var wrap = e.target.closest('.board-canvas-wrap');
  if (!wrap) return;
  if (e.target.closest('.postit, .board-element, .connection-group, .connection-pin, .board-toolbar, button, input, textarea, [contenteditable]')) return;
  var t = e.touches[0];
  boardPanState = {
    startX: t.clientX, startY: t.clientY,
    startScrollLeft: wrap.scrollLeft, startScrollTop: wrap.scrollTop,
    wrap: wrap, active: false
  };
}, { passive: true });
document.addEventListener('touchmove', function(e) {
  if (!boardPanState) return;
  var t = e.touches[0];
  var dx = t.clientX - boardPanState.startX;
  var dy = t.clientY - boardPanState.startY;
  if (!boardPanState.active) {
    if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
    boardPanState.active = true;
    boardPanState.wrap.classList.add('panning');
  }
  boardPanState.wrap.scrollLeft = boardPanState.startScrollLeft - dx;
  boardPanState.wrap.scrollTop = boardPanState.startScrollTop - dy;
  e.preventDefault();
}, { passive: false });
document.addEventListener('touchend', function(e) {
  if (!boardPanState) return;
  boardPanState.wrap.classList.remove('panning');
  boardPanState = null;
});

// Touch drag for post-its and board elements (Android)
document.addEventListener('touchstart', function(e) {
  if (e.touches.length !== 1) return;
  var el = null, type = 'postit';
  var header = e.target.closest('.postit-header');
  if (header) {
    el = header.closest('.postit');
    if (!el) return;
    if (e.target.tagName === 'TEXTAREA') return;
  } else {
    el = e.target.closest('.board-element');
    if (!el) return;
    type = 'element';
    if (e.target.closest('.edit-handle, .board-el-close, .audio-player, button')) return;
  }
  var wrap = el.closest('.board-canvas-wrap');
  if (!wrap) return;
  var boardId = wrap.dataset.boardId;
  if (!boardId) return;
  var touch = e.touches[0];
  postitDragState = {
    boardId: boardId, elementId: el.dataset.id, type: type,
    startX: touch.clientX, startY: touch.clientY,
    origX: parseInt(el.style.left) || 0, origY: parseInt(el.style.top) || 0,
    el: el
  };
  el.classList.add('dragging');
}, { passive: true });

document.addEventListener('touchmove', function(e) {
  if (!postitDragState) return;
  if (e.touches.length > 1) return;
  var touch = e.touches[0];
  var dx = (touch.clientX - postitDragState.startX) / boardZoom;
  var dy = (touch.clientY - postitDragState.startY) / boardZoom;
  var nx = Math.max(0, postitDragState.origX + dx);
  var ny = Math.max(0, postitDragState.origY + dy);
  postitDragState.el.style.left = nx + 'px';
  postitDragState.el.style.top = ny + 'px';
  updateImprovedConnections();
  e.preventDefault();
}, { passive: false });

document.addEventListener('touchend', function(e) {
  if (!postitDragState) return;
  postitDragState.el.classList.remove('dragging');
  var board = state.boards.find(function(b) { return b.id === Number(postitDragState.boardId); });
  if (board) {
    if (postitDragState.type === 'element') {
      var el = board.elements.find(function(e) { return e.id === Number(postitDragState.elementId); });
      if (el) { el.x = parseInt(postitDragState.el.style.left); el.y = parseInt(postitDragState.el.style.top); }
    } else {
      var p = board.postits.find(function(p) { return p.id === Number(postitDragState.elementId); });
      if (p) { p.x = parseInt(postitDragState.el.style.left); p.y = parseInt(postitDragState.el.style.top); }
    }
  }
  save();
  postitDragState = null;
});

// Right-click context menu on post-its and note cards (PC)


// Capture-phase guard: blocks synthesized click on hl-toggle when palette is open
document.addEventListener('click', function(e) {
  if (e.target.closest('.hl-toggle')) {
    var hp = document.getElementById('hlPalette');
    if (hp && !hp.classList.contains('hidden')) {
      e.stopImmediatePropagation();
    }
  }
}, true);

// Click outside context menu closes it
document.addEventListener('click', function(e) {
  if (!e.target.closest('#contextMenu')) hideContextMenu();
  if (!e.target.closest('#hlPalette') && !e.target.closest('.hl-toggle')) { var hl = document.getElementById('hlPalette'); if (hl) hl.classList.add('hidden'); }
  if (!e.target.closest('#exportPalette') && !e.target.closest('.exp-toggle')) { var exp = document.getElementById('exportPalette'); if (exp) exp.classList.add('hidden'); }
  if (!e.target.closest('.note-table')) {
    if (_activeTableId !== null) { _activeTableId = null; _tableSelection.itemId = null; _tableSelection.cells = []; renderNoteContent(); }
  }
  /* Exit edit mode when clicking outside the element */
  if (_editModeElementId && !e.target.closest('.board-element.editing') && !e.target.closest('.edit-handle')) {
    _exitEditMode();
  }
});

// Click on note links
document.addEventListener('mousedown', function(e) {
  var link = e.target.closest('.note-link, .ext-link');
  if (link) { e.preventDefault(); }
});
document.addEventListener('click', function(e) {
  var link = e.target.closest('.note-link');
  if (link) { e.preventDefault(); e.stopPropagation(); navigateToNoteLink(link.dataset.target); return; }
  link = e.target.closest('.ext-link');
  if (link) { e.preventDefault(); e.stopPropagation(); window.open(link.href, '_blank'); }
});

// Double-click on equations in notes opens editor
document.addEventListener('dblclick', function(e) {
  var katexInline = e.target.closest('.katex-inline');
  var katexBlock = e.target.closest('.katex-block');
  var katexEl = katexInline || katexBlock;
  if (katexEl) {
    e.preventDefault();
    e.stopPropagation();
    var latex = katexEl.getAttribute('data-latex') || '';
    var isBlock = !!katexBlock;
    var itemEl = katexEl.closest('.list-item');
    if (itemEl) {
      var noteId = state.activeNoteId;
      var itemId = Number(itemEl.getAttribute('data-id'));
      openLatexEditor(noteId, itemId, latex, isBlock);
      return;
    }
    /* Handle equations inside post-its */
    var postitEl = katexEl.closest('.postit');
    if (postitEl) {
      var postitId = Number(postitEl.getAttribute('data-id'));
      var board = state.boards.find(function(b) { return b.id === state.activeBoardId; });
      if (board) {
        var p = board.postits.find(function(p) { return p.id === postitId; });
        if (p) {
          openLatexEditorForPostit(state.activeBoardId, postitId, latex, isBlock);
          return;
        }
      }
    }
    return;
  }
  // Double-click on board equation element opens editor
  var boardEqEl = e.target.closest('.board-equation');
  if (boardEqEl) {
    e.preventDefault();
    e.stopPropagation();
    var elId = Number(boardEqEl.getAttribute('data-id'));
    openBoardEquationEditor(state.activeBoardId, elId);
    return;
  }
});

// Long-press on post-its and board elements (Android)
var longPressTimer = null;
// Touch resize for board elements
document.addEventListener('touchstart', function(e) {
  var handle = e.target.closest('.edit-handle');
  if (!handle) return;
  var el = handle.closest('.board-element');
  if (!el) return;
  if (el.dataset.type === 'audio') return;
  var t = e.touches[0];
  _startResize(t.clientX, t.clientY, el, handle.getAttribute('data-dir') || 'se');
  _resizeState.touchId = t.identifier;
  e.preventDefault();
  e.stopPropagation();
}, { passive: false });

document.addEventListener('touchstart', function(e) {
  var postit = e.target.closest('.postit');
  var boardEl = e.target.closest('.board-element');
  if (!postit && !boardEl) return;
  if (postit) {
    if (e.target.closest('.postit-close') || e.target.closest('.postit-color-dot') || e.target.closest('[contenteditable]')) return;
    if (e.target.closest('.postit-header')) return; // let header handle drag
  }
  if (boardEl) {
    if (e.target.closest('.edit-handle, .board-el-close, .audio-player, button')) return;
  }
  var touch = e.touches[0];
  var targetId = postit ? Number(postit.dataset.id) : Number(boardEl.dataset.id);
  var elType = boardEl ? boardEl.dataset.type : null;
  var boardId = state.activeBoardId;
  longPressTimer = setTimeout(function() {
    longPressTimer = null;
    hideContextMenu();
    if (postit) {
      showContextMenu(touch.clientX, touch.clientY, [
        { label: t('connect'), action: function() { contextConnect(targetId); } }
      ]);
    } else {
      var items = [];
      items.push({ label: t('modify'), action: function() { toggleEditMode(boardId, targetId); } });
      items.push({ label: t('connect'), action: function() { contextConnect(targetId); } });
      items.push({ label: t('del'), action: function() { deleteBoardElement(boardId, targetId); } });
      if (elType === 'audio') items.shift();
      showContextMenu(touch.clientX, touch.clientY, items);
    }
  }, 500);
}, { passive: true });

document.addEventListener('touchmove', function(e) {
  if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
  if (_resizeState && _resizeState.touchId !== undefined) {
    /* touch resize active */
    var t = findTouch(e, _resizeState.touchId);
    if (t) {
      _doResize(t.clientX, t.clientY);
      if (e.cancelable) e.preventDefault();
    }
  }
}, { passive: false });

document.addEventListener('touchend', function(e) {
  if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
  if (_resizeState && _resizeState.touchId !== undefined) {
    var t = findTouch(e, _resizeState.touchId);
    if (!t) {
      _endResize();
    }
  }
});

function findTouch(e, id) {
  for (var i = 0; i < e.touches.length; i++) {
    if (e.touches[i].identifier === id) return e.touches[i];
  }
  for (var i = 0; i < e.changedTouches.length; i++) {
    if (e.changedTouches[i].identifier === id) return e.changedTouches[i];
  }
  return null;
}

// Long-press on note cards (Android)
var noteLongPressTimer = null;
var preventCardClick = false;

// Long-press on highlight button
var hlLongPressTimer = null;
// Long-press on board cards
var boardLongPressTimer = null;
// Long-press on study set cards
var studyLongPressTimer = null;
var fabLongPressTimer = null;
document.addEventListener('touchstart', function(e) {
  var hl = e.target.closest('.hl-toggle');
  if (hl) {
    hlLongPressTimer = setTimeout(function() { hlLongPressTimer = null; toggleHighlightPalette(); }, 500);
    return;
  }
    var card = e.target.closest('.card[data-note-id]');
    if (card) {
      var touch = e.touches[0];
      var noteId = Number(card.dataset.noteId);
      var x = touch.clientX, y = touch.clientY;
      noteLongPressTimer = setTimeout(function() {
        noteLongPressTimer = null;
        hideContextMenu();
        var note = state.notes.find(function(n) { return n.id === noteId; });
        if (!note) return;
        var favLabel = note.favorite ? t('removeFav') : t('addFav');
        var coverLabel = note.cover ? t('removeCover') : t('addCover');
        showContextMenu(x, y, [
          { label: t('rename'), action: function() { renameNote(noteId); } },
          { label: favLabel, action: function() { toggleFavorite(noteId); } },
          { label: coverLabel, action: function() { if (note.cover) { removeCover(noteId); } else { triggerImportCover(noteId); } } },
          { label: t('exportNote'), action: function() { exportSingleNote(noteId); } },
          { label: t('del'), action: function() { confirmDeleteNote(noteId); } }
        ]);
      preventCardClick = true;
      setTimeout(function() { preventCardClick = false; }, 400);
    }, 500);
    return;
  }
  var boardCard = e.target.closest('.card[data-board-id]');
  if (boardCard) {
    var touch = e.touches[0];
    var bid = Number(boardCard.dataset.boardId);
    var x = touch.clientX, y = touch.clientY;
    boardLongPressTimer = setTimeout(function() {
      boardLongPressTimer = null;
      hideContextMenu();
      showContextMenu(x, y, [
        { label: t('rename'), action: function() { renameBoard(bid); } },
        { label: t('exportBoard'), action: function() { exportSingleBoard(bid); } },
        { label: t('del'), action: function() { confirmDeleteBoard(bid); } }
      ]);
    }, 500);
    return;
  }
  var studyCard = e.target.closest('.card[data-study-set-id]');
  if (!studyCard) {
    // Study card items long-press
    var scItem = e.target.closest('#studySetCards .study-card-item');
    if (scItem) {
      if (e.target.closest('.card-btn')) return;
      var touch = e.touches[0];
      var sid = state.activeStudySetId;
      var cardId = Number(scItem.dataset.cardId);
      if (!sid) return;
      var x = touch.clientX, y = touch.clientY;
      studyCardLongPressTimer = setTimeout(function() {
        studyCardLongPressTimer = null;
        hideContextMenu();
        showContextMenu(x, y, [
          { label: t('del'), action: function() { deleteStudyCard(sid, cardId); } }
        ]);
      }, 500);
    }
    return;
  }
  if (e.target.closest('.card-btn')) return;
  var touch = e.touches[0];
  var sid = Number(studyCard.dataset.studySetId);
  var x = touch.clientX, y = touch.clientY;
  studyLongPressTimer = setTimeout(function() {
    studyLongPressTimer = null;
    hideContextMenu();
    showContextMenu(x, y, [
      { label: t('rename'), action: function() { renameStudySet(sid); } },
      { label: t('exportStudySet'), action: function() { exportSingleStudySet(sid); } },
      { label: t('del'), action: function() { deleteStudySet(sid); } }
    ]);
  }, 500);
}, { passive: true });

// FAB long-press for import menu (touch)
document.addEventListener('touchstart', function(e) {
  var fab = e.target.closest('#fabBtn');
  if (!fab) return;
  if (fab.classList.contains('hidden')) return;
  fabLongPressTimer = setTimeout(function() {
    fabLongPressTimer = null;
    _fabLongPressed = true;
    showFabMenu();
  }, 500);
}, { passive: true });

document.addEventListener('touchmove', function(e) {
  if (noteLongPressTimer) { clearTimeout(noteLongPressTimer); noteLongPressTimer = null; }
  if (hlLongPressTimer) { clearTimeout(hlLongPressTimer); hlLongPressTimer = null; }
  if (boardLongPressTimer) { clearTimeout(boardLongPressTimer); boardLongPressTimer = null; }
  if (studyLongPressTimer) { clearTimeout(studyLongPressTimer); studyLongPressTimer = null; }
  if (studyCardLongPressTimer) { clearTimeout(studyCardLongPressTimer); studyCardLongPressTimer = null; }
  if (fabLongPressTimer) { clearTimeout(fabLongPressTimer); fabLongPressTimer = null; }
}, { passive: true });

document.addEventListener('touchend', function(e) {
  if (noteLongPressTimer) { clearTimeout(noteLongPressTimer); noteLongPressTimer = null; }
  if (hlLongPressTimer) { clearTimeout(hlLongPressTimer); hlLongPressTimer = null; }
  if (boardLongPressTimer) { clearTimeout(boardLongPressTimer); boardLongPressTimer = null; }
  if (studyLongPressTimer) { clearTimeout(studyLongPressTimer); studyLongPressTimer = null; }
  if (studyCardLongPressTimer) { clearTimeout(studyCardLongPressTimer); studyCardLongPressTimer = null; }
  if (fabLongPressTimer) { clearTimeout(fabLongPressTimer); fabLongPressTimer = null; }
});

// Long-press on note detail view removed

document.addEventListener('touchmove', function(e) {
  if (detailLongPressTimer) { clearTimeout(detailLongPressTimer); detailLongPressTimer = null; }
  if (hlLongPressTimer) { clearTimeout(hlLongPressTimer); hlLongPressTimer = null; }
}, { passive: true });

document.addEventListener('touchend', function(e) {
  if (detailLongPressTimer) { clearTimeout(detailLongPressTimer); detailLongPressTimer = null; }
  if (hlLongPressTimer) { clearTimeout(hlLongPressTimer); hlLongPressTimer = null; }
});

// Notes drag
document.addEventListener('mousedown', function(e) {
  var handle = e.target.closest('.drag-handle');
  if (!handle) return;
  var item = handle.closest('.list-item');
  if (!item) return;
  var area = item.closest('.items-area');
  if (!area) return;
  var noteId = area.dataset.noteId;
  if (!noteId) return;
  var note = state.notes.find(function(n) { return n.id == noteId; });
  if (!note) return;
  dragState = { noteId: noteId, itemId: item.dataset.id, note: note, clone: null, lastY: 0 };
  e.preventDefault();
});
// Notes drag touch support
document.addEventListener('touchstart', function(e) {
  var handle = e.target.closest('.drag-handle');
  if (!handle) return;
  var item = handle.closest('.list-item');
  if (!item) return;
  var area = item.closest('.items-area');
  if (!area) return;
  var noteId = area.dataset.noteId;
  if (!noteId) return;
  var note = state.notes.find(function(n) { return n.id == noteId; });
  if (!note) return;
  dragState = { noteId: noteId, itemId: item.dataset.id, note: note, clone: null, lastY: 0 };
}, { passive: true });

// Card drag (notes, boards, study sets, study cards)
document.addEventListener('mousedown', function(e) {
  var handle = e.target.closest('.card-drag-handle');
  if (!handle) return;
  var card = handle.closest('.card, .study-card-item');
  if (!card) return;
  var grid = card.closest('.selection-grid, .study-set-cards');
  if (!grid) return;
  var type, id, setId = null;
  if (card.dataset.noteId) { type = 'notes'; id = Number(card.dataset.noteId); }
  else if (card.dataset.boardId) { type = 'boards'; id = Number(card.dataset.boardId); }
  else if (card.dataset.studySetId) { type = 'studySets'; id = Number(card.dataset.studySetId); }
  else if (card.dataset.cardId) { type = 'studyCards'; id = Number(card.dataset.cardId); setId = state.activeStudySetId; }
  else return;
  card.classList.add('dragging');
  cardDragState = { el: card, type: type, id: id, setId: setId, clone: null, grid: grid, lastOverId: null };
  e.preventDefault();
});

// Card drag touch support
document.addEventListener('touchstart', function(e) {
  var handle = e.target.closest('.card-drag-handle');
  if (!handle) return;
  var card = handle.closest('.card, .study-card-item');
  if (!card) return;
  var grid = card.closest('.selection-grid, .study-set-cards');
  if (!grid) return;
  var type, id, setId = null;
  if (card.dataset.noteId) { type = 'notes'; id = Number(card.dataset.noteId); }
  else if (card.dataset.boardId) { type = 'boards'; id = Number(card.dataset.boardId); }
  else if (card.dataset.studySetId) { type = 'studySets'; id = Number(card.dataset.studySetId); }
  else if (card.dataset.cardId) { type = 'studyCards'; id = Number(card.dataset.cardId); setId = state.activeStudySetId; }
  else return;
  card.classList.add('dragging');
  cardDragState = { el: card, type: type, id: id, setId: setId, clone: null, grid: grid, lastOverId: null };
}, { passive: true });

document.addEventListener('touchmove', function(e) {
  if (!cardDragState) return;
  var touch = e.touches[0];
  if (!cardDragState.clone) {
    var orig = cardDragState.el;
    cardDragState.clone = orig.cloneNode(true);
    cardDragState.clone.style.cssText = 'position:fixed;pointer-events:none;z-index:9999;opacity:0.85;width:' + orig.offsetWidth + 'px;background:var(--surface);border:2px solid var(--accent);border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.4);';
    var dh = cardDragState.clone.querySelector('.card-drag-handle');
    if (dh) dh.style.display = 'none';
    document.body.appendChild(cardDragState.clone);
  }
  cardDragState.clone.style.left = (touch.clientX + 12) + 'px';
  cardDragState.clone.style.top = (touch.clientY - 8) + 'px';
  e.preventDefault();
  var grid = cardDragState.grid;
  var closestEl = null;
  var closestDist = Infinity;
  var allItems = grid.querySelectorAll('.card, .study-card-item');
  for (var i = 0; i < allItems.length; i++) {
    if (allItems[i] === cardDragState.el || allItems[i].classList.contains('dragging')) continue;
    var rect = allItems[i].getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;
    var dist = Math.sqrt(Math.pow(touch.clientX - cx, 2) + Math.pow(touch.clientY - cy, 2));
    if (dist < closestDist) { closestDist = dist; closestEl = allItems[i]; }
  }
  if (closestEl) {
    var closestId = Number(closestEl.dataset.noteId || closestEl.dataset.boardId || closestEl.dataset.studySetId || closestEl.dataset.cardId);
    if (closestId !== cardDragState.lastOverId) {
      var crect = closestEl.getBoundingClientRect();
      var midY = crect.top + crect.height / 2;
      if (touch.clientY < midY) grid.insertBefore(cardDragState.el, closestEl);
      else if (closestEl.nextSibling) grid.insertBefore(cardDragState.el, closestEl.nextSibling);
      else grid.appendChild(cardDragState.el);
      cardDragState.lastOverId = closestId;
    }
  }
}, { passive: false });

document.addEventListener('touchend', function(e) {
  if (!cardDragState) return;
  cardDragFinish();
});

document.addEventListener('touchcancel', function(e) {
  if (!cardDragState) return;
  if (cardDragState.el) cardDragState.el.classList.remove('dragging');
  cleanupCardDrag();
});

// Notes drag touch move
document.addEventListener('touchmove', function(e) {
  if (!dragState) return;
  var touch = e.touches[0];
  dragState.lastY = touch.clientY;
  if (!dragState.clone) {
    var orig = document.querySelector('.list-item[data-id="' + dragState.itemId + '"]');
    if (!orig) { cleanupDrag(); return; }
    dragState.clone = orig.cloneNode(true);
    dragState.clone.style.cssText = 'position:fixed;pointer-events:none;z-index:9999;opacity:0.85;width:' + orig.offsetWidth + 'px;background:#3a3a3a;border:1px solid #5b7db5;border-radius:4px;box-shadow:0 8px 24px rgba(0,0,0,0.4);padding:4px;';
    dragState.clone.querySelector('.item-actions').style.display = 'none';
    document.body.appendChild(dragState.clone);
    orig.classList.add('dragging');
  }
  dragState.clone.style.left = (touch.clientX + 12) + 'px';
  dragState.clone.style.top = (touch.clientY - 8) + 'px';
  var itemsArea = document.querySelector('.items-area');
  if (itemsArea) {
    Array.prototype.forEach.call(itemsArea.querySelectorAll('.list-item'), function(el) {
      el.style.borderTop = ''; el.style.borderBottom = '';
      if (el.dataset.id === dragState.itemId) return;
      var rect = el.getBoundingClientRect();
      var mid = rect.top + rect.height / 2;
      if (touch.clientY < mid) el.style.borderTop = '2px solid #5b7db5';
      else el.style.borderBottom = '2px solid #5b7db5';
    });
  }
  e.preventDefault();
}, { passive: false });

// Notes drag touch end
document.addEventListener('touchend', function(e) {
  if (!dragState) return;
  var touchY = dragState.lastY;
  var draggedEl = document.querySelector('.list-item[data-id="' + dragState.itemId + '"]');
  if (draggedEl) draggedEl.classList.remove('dragging');
  var itemsArea = document.querySelector('.items-area');
  if (itemsArea) {
    var items = itemsArea.querySelectorAll('.list-item');
    var targetIdx = -1, after = false;
    for (var i = 0; i < items.length; i++) {
      var el2 = items[i];
      el2.style.borderTop = ''; el2.style.borderBottom = '';
      if (el2.dataset.id === dragState.itemId) continue;
      var rect2 = el2.getBoundingClientRect();
      if (touchY < rect2.top + rect2.height / 2) { targetIdx = i; after = false; break; }
    }
    if (targetIdx === -1) {
      for (var i = items.length - 1; i >= 0; i--) {
        if (items[i].dataset.id !== dragState.itemId) {
          rect2 = items[i].getBoundingClientRect();
          if (touchY >= rect2.top + rect2.height / 2) { targetIdx = i; after = true; break; }
        }
      }
    }
    if (targetIdx >= 0) {
      var note = dragState.note;
      var itemIdNum = Number(dragState.itemId);
      var itemIdx = -1;
      for (var k = 0; k < note.items.length; k++) { if (note.items[k].id === itemIdNum) { itemIdx = k; break; } }
      if (itemIdx >= 0) {
        var item = note.items[itemIdx];
        var others = [];
        for (var k = 0; k < note.items.length; k++) { if (note.items[k].id !== itemIdNum) others.push(note.items[k]); }
        var insertAt = after ? targetIdx + 1 : targetIdx;
        if (insertAt < 0) insertAt = 0;
        if (insertAt > others.length) insertAt = others.length;
        var newItems = [];
        var inserted = false;
        for (var j = 0; j < others.length; j++) {
          if (j === insertAt) { newItems.push(item); inserted = true; }
          newItems.push(others[j]);
        }
        if (!inserted) newItems.push(item);
        note.items = newItems;
        save();
        renderNoteContent();
      }
    }
  }
  cleanupDrag();
});

function cardDragFinish() {
  var draggedEl = cardDragState.el;
  if (draggedEl) draggedEl.classList.remove('dragging');
  var grid = cardDragState.grid;
  var items = grid.querySelectorAll('.card, .study-card-item');
  var orderedIds = [];
  for (var i = 0; i < items.length; i++) {
    var id = Number(items[i].dataset.noteId || items[i].dataset.boardId || items[i].dataset.studySetId || items[i].dataset.cardId);
    if (!isNaN(id)) orderedIds.push(id);
  }
  var arr;
  if (cardDragState.type === 'notes') arr = state.notes;
  else if (cardDragState.type === 'boards') arr = state.boards;
  else if (cardDragState.type === 'studySets') arr = state.studySets;
  else if (cardDragState.type === 'studyCards') {
    var set = state.studySets.find(function(s) { return s.id === cardDragState.setId; });
    if (set) arr = set.cards;
  }
  if (arr) {
    var itemMap = {};
    for (var k = 0; k < arr.length; k++) itemMap[arr[k].id] = arr[k];
    var newArr = [];
    for (var k = 0; k < orderedIds.length; k++) {
      if (itemMap[orderedIds[k]]) newArr.push(itemMap[orderedIds[k]]);
    }
    if (cardDragState.type === 'notes') state.notes = newArr;
    else if (cardDragState.type === 'boards') state.boards = newArr;
    else if (cardDragState.type === 'studySets') state.studySets = newArr;
    else if (cardDragState.type === 'studyCards' && set) set.cards = newArr;
    save();
    renderAll();
  }
  cleanupCardDrag();
}

document.addEventListener('mousemove', function(e) {
  if (dragState) {
    if (!dragState.clone) {
      var orig = document.querySelector('.list-item[data-id="' + dragState.itemId + '"]');
      if (!orig) { cleanupDrag(); return; }
      dragState.clone = orig.cloneNode(true);
      dragState.clone.style.cssText = 'position:fixed;pointer-events:none;z-index:9999;opacity:0.85;width:' + orig.offsetWidth + 'px;background:#3a3a3a;border:1px solid #5b7db5;border-radius:4px;box-shadow:0 8px 24px rgba(0,0,0,0.4);padding:4px;';
      dragState.clone.querySelector('.item-actions').style.display = 'none';
      document.body.appendChild(dragState.clone);
      orig.classList.add('dragging');
    }
    dragState.clone.style.left = (e.clientX + 12) + 'px';
    dragState.clone.style.top = (e.clientY - 8) + 'px';
    var itemsArea = document.querySelector('.items-area');
    if (itemsArea) {
      Array.prototype.forEach.call(itemsArea.querySelectorAll('.list-item'), function(el) {
        el.style.borderTop = ''; el.style.borderBottom = '';
        if (el.dataset.id === dragState.itemId) return;
        var rect = el.getBoundingClientRect();
        var mid = rect.top + rect.height / 2;
        if (e.clientY < mid) el.style.borderTop = '2px solid #5b7db5';
        else el.style.borderBottom = '2px solid #5b7db5';
      });
    }
  }
  if (cardDragState) {
    if (!cardDragState.clone) {
      var orig = cardDragState.el;
      cardDragState.clone = orig.cloneNode(true);
      cardDragState.clone.style.cssText = 'position:fixed;pointer-events:none;z-index:9999;opacity:0.85;width:' + orig.offsetWidth + 'px;background:var(--surface);border:2px solid var(--accent);border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.4);';
      var dh = cardDragState.clone.querySelector('.card-drag-handle');
      if (dh) dh.style.display = 'none';
      document.body.appendChild(cardDragState.clone);
      orig.classList.add('dragging');
    }
    cardDragState.clone.style.left = (e.clientX + 12) + 'px';
    cardDragState.clone.style.top = (e.clientY - 8) + 'px';
    var grid = cardDragState.grid;
    var closestEl = null;
    var closestDist = Infinity;
    var allItems = grid.querySelectorAll('.card, .study-card-item');
    for (var i = 0; i < allItems.length; i++) {
      if (allItems[i] === cardDragState.el || allItems[i].classList.contains('dragging')) continue;
      var rect = allItems[i].getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var dist = Math.sqrt(Math.pow(e.clientX - cx, 2) + Math.pow(e.clientY - cy, 2));
      if (dist < closestDist) { closestDist = dist; closestEl = allItems[i]; }
    }
    if (closestEl) {
      var closestId = Number(closestEl.dataset.noteId || closestEl.dataset.boardId || closestEl.dataset.studySetId || closestEl.dataset.cardId);
      if (closestId !== cardDragState.lastOverId) {
        var crect = closestEl.getBoundingClientRect();
        var midY = crect.top + crect.height / 2;
        if (e.clientY < midY) grid.insertBefore(cardDragState.el, closestEl);
        else if (closestEl.nextSibling) grid.insertBefore(cardDragState.el, closestEl.nextSibling);
        else grid.appendChild(cardDragState.el);
        cardDragState.lastOverId = closestId;
      }
    }
  }
});

document.addEventListener('mouseup', function(e) {
  if (dragState) {
    var draggedEl = document.querySelector('.list-item[data-id="' + dragState.itemId + '"]');
    if (draggedEl) draggedEl.classList.remove('dragging');
    var itemsArea = document.querySelector('.items-area');
    if (itemsArea) {
      var items = itemsArea.querySelectorAll('.list-item');
      var targetIdx = -1, after = false;
      for (var i = 0; i < items.length; i++) {
        var el2 = items[i];
        el2.style.borderTop = ''; el2.style.borderBottom = '';
        if (el2.dataset.id === dragState.itemId) continue;
        var rect2 = el2.getBoundingClientRect();
        if (e.clientY < rect2.top + rect2.height / 2) { targetIdx = i; after = false; break; }
      }
      if (targetIdx === -1) {
        for (var i = items.length - 1; i >= 0; i--) {
          if (items[i].dataset.id !== dragState.itemId) {
            rect2 = items[i].getBoundingClientRect();
            if (e.clientY >= rect2.top + rect2.height / 2) { targetIdx = i; after = true; break; }
          }
        }
      }
      if (targetIdx >= 0) {
        var note = dragState.note;
        var itemIdNum = Number(dragState.itemId);
        var itemIdx = -1;
        for (var k = 0; k < note.items.length; k++) { if (note.items[k].id === itemIdNum) { itemIdx = k; break; } }
        if (itemIdx >= 0) {
          var item = note.items[itemIdx];
          var others = [];
          for (var k = 0; k < note.items.length; k++) { if (note.items[k].id !== itemIdNum) others.push(note.items[k]); }
          var insertAt = after ? targetIdx + 1 : targetIdx;
          if (insertAt < 0) insertAt = 0;
          if (insertAt > others.length) insertAt = others.length;
          var newItems = [];
          var inserted = false;
          for (var j = 0; j < others.length; j++) {
            if (j === insertAt) { newItems.push(item); inserted = true; }
            newItems.push(others[j]);
          }
          if (!inserted) newItems.push(item);
          note.items = newItems;
          save();
          renderNoteContent();
        }
      }
    }
    cleanupDrag();
  }
  if (cardDragState) {
    cardDragFinish();
  }
});

function cleanupDrag() {
  if (dragState && dragState.clone) dragState.clone.remove();
  dragState = null;
  document.body.style.cursor = '';
}

function cleanupCardDrag() {
  if (cardDragState && cardDragState.clone) cardDragState.clone.remove();
  cardDragState = null;
}

// Deteccion de Android para ajustar por barra de estado
if (/android/i.test(navigator.userAgent)) {
  document.documentElement.classList.add('android');
  var sb = window.AndroidBridge && window.AndroidBridge.getStatusBarHeight ? Number(window.AndroidBridge.getStatusBarHeight()) : 0;
  if (!sb) sb = 24;
  document.documentElement.style.setProperty('--status-bar-h', sb + 'px');
}

// Init
load();
state.notes.forEach(function(n) { if (typeof n.id === 'string') n.id = Number(n.id); if (!n.cover) n.cover = ''; if (!n.events) n.events = []; if (!n.tasks) n.tasks = []; if (n.items) n.items.forEach(function(i) { if (typeof i.id === 'string') i.id = Number(i.id); }); });
state.notes.forEach(function(n) {
  if (n.diary) {
    var p = n.title.split('-').map(Number);
    if (p.length === 3) {
      var noteDate = new Date(p[2], p[1] - 1, p[0]).getTime();
      (n.events || []).forEach(function(e) { e.createdAt = noteDate; });
      (n.tasks || []).forEach(function(t) { t.createdAt = noteDate; });
    }
  }
});
state.boards.forEach(function(b) {
  if (typeof b.id === 'string') b.id = Number(b.id);
  if (b.postits) b.postits.forEach(function(p) { if (typeof p.id === 'string') p.id = Number(p.id); });
});
state.studySets.forEach(function(s) {
  if (typeof s.id === 'string') s.id = Number(s.id);
  if (!s.cards) s.cards = [];
  if (s.cards) s.cards.forEach(function(c) { if (typeof c.id === 'string') c.id = Number(c.id); });
});
if (typeof state.activeNoteId === 'string') state.activeNoteId = Number(state.activeNoteId);
if (typeof state.activeBoardId === 'string') state.activeBoardId = Number(state.activeBoardId);
if (typeof state.activeStudySetId === 'string') state.activeStudySetId = Number(state.activeStudySetId);
renderAll();
applyTheme();
applyLang();
document.documentElement.lang = state.lang || 'en';

ImageManager.init().then(function() {
  ImageManager.cleanupOrphans();
}).catch(function(e) {
  console.warn('ImageManager init error:', e);
});

if (state.firstVisit) {
  showDialog('welcomeDialog');
}

/* Verificar notificaciones al iniciar */
checkTodayNotifications();
updateSettingsToggleStates();

/* Comprobar notificaciones peri\u00f3dicamente cada 60 segundos */
setInterval(checkTodayNotifications, 60000);

/* Volver a verificar al reanudar la app */
document.addEventListener('visibilitychange', function() {
  if (!document.hidden) checkTodayNotifications();
});

function toggleMenu() {
  document.getElementById('menuOverlay').classList.toggle('open');
  document.getElementById('menuSidebar').classList.toggle('open');
}
var _fabLongPressed = false;
function fabClick() {
  if (_fabLongPressed) { _fabLongPressed = false; return; }
  if (state.view === 'board') showNewBoardDialog();
  else if (state.view === 'diary') openTodayDiary();
  else if (state.view === 'study') {
    if (state.activeStudySetId) showAddStudyCard(state.activeStudySetId);
    else showNewStudySetDialog();
  }
  else showNewNoteDialog();
}
function showFabMenu() {
  hideContextMenu();
  var items = getFabMenuItems();
  if (items.length === 0) return;
  var fab = document.getElementById('fabBtn');
  if (!fab) return;
  var rect = fab.getBoundingClientRect();
  showContextMenu(Math.max(8, rect.left - 150), Math.max(8, rect.top - 80), items);
  _fabLongPressed = true;
}
function getFabMenuItems() {
  if (state.view === 'board')
    return [{ label: t('import'), action: function() { document.getElementById('importSingleInput').click(); } }];
  if (state.view === 'study') {
    if (state.activeStudySetId) return [];
    return [{ label: t('import'), action: function() { document.getElementById('importSingleInput').click(); } }];
  }
  if (state.view === 'diary') return [];
  return [{ label: t('import'), action: function() { document.getElementById('importSingleInput').click(); } }];
}
function updateFab() {
  var fab = document.getElementById('fabBtn');
  if (!fab) return;
  var inStudying = window._studyingSetId != null;
  var insideItem = (state.view === 'notes' && state.activeNoteId) || (state.view === 'board' && state.activeBoardId) || (state.view === 'diary' && state.activeNoteId);
  if (inStudying) { fab.classList.add('hidden'); return; }
  var diaryCalendar = state.view === 'diary' && !state.activeNoteId;
  fab.classList.toggle('hidden', (state.view !== 'notes' && state.view !== 'board' && state.view !== 'diary' && state.view !== 'study') || insideItem || diaryCalendar);
}
function updateTableFab() {
  var fab = document.getElementById('tableFabBtn');
  if (!fab) return;
  var show = _activeTableId && _tableSelection.itemId && _tableSelection.cells.length > 0;
  if (show) {
    if (_tableSelection.cells.length >= 2) {
      fab.textContent = t('mergeCells');
      fab.onclick = function() {
        var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
        if (!note) return;
        var item = note.items.find(function(i) { return i.id === _tableSelection.itemId; });
        if (item) mergeSelectedCells(state.activeNoteId, item.id);
      };
    } else {
      var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
      var item = note ? note.items.find(function(i) { return i.id === _tableSelection.itemId; }) : null;
      if (item && item.cells) {
        var cell = item.cells[_tableSelection.cells[0]];
        if (cell && (cell.rowspan > 1 || cell.colspan > 1)) {
          fab.textContent = t('splitCell');
          fab.onclick = function() { splitTableCells(state.activeNoteId, item.id); };
        } else { show = false; }
      } else { show = false; }
    }
  }
  fab.classList.toggle('hidden', !show);
}
function showSettings() {
  var sel = document.getElementById('settingsLangSelect');
  if (sel) sel.value = state.lang || 'en';
  renderDiaryPwdSection();
  updateSettingsToggleStates();
  showDialog('settingsDialog');
}

function closeMenu() {
  document.getElementById('menuOverlay').classList.remove('open');
  document.getElementById('menuSidebar').classList.remove('open');
}

function switchView(view) {
  clearCurrentUnlock();
  _activeTableId = null; _tableSelection.itemId = null; _tableSelection.cells = [];
  if (state.view === 'diary' && view !== 'diary') diaryUnlocked = false;
  if (view === 'notes') state.activeNoteId = null;
  if (view === 'board') state.activeBoardId = null;
  if (view === 'diary') {
    if (!diaryUnlockFlow()) return;
    state.activeNoteId = null;
    resetDiaryCalendarToToday();
  }
  state.view = view;
  var inDiaryNote = view === 'diary' && state.activeNoteId;
  document.getElementById('panelNotes').classList.toggle('hidden', view !== 'notes' && !inDiaryNote);
  document.getElementById('panelDiary').classList.toggle('hidden', view !== 'diary' || inDiaryNote);
  document.getElementById('panelBoard').classList.toggle('hidden', view !== 'board');
  document.getElementById('panelStudy').classList.toggle('hidden', view !== 'study');
  document.getElementById('panelCafecito').classList.toggle('hidden', view !== 'cafecito');
  document.getElementById('panelTrash').classList.toggle('hidden', view !== 'trash');
  document.getElementById('menuNotes').classList.toggle('active', view === 'notes');
  document.getElementById('menuBoard').classList.toggle('active', view === 'board');
  var dm = document.getElementById('menuDiary');
  if (dm) dm.classList.toggle('active', view === 'diary');
  var sm = document.getElementById('menuStudy');
  if (sm) sm.classList.toggle('active', view === 'study');
  var cm = document.getElementById('menuCafecito');
  if (cm) cm.classList.toggle('active', view === 'cafecito');
  var tm = document.getElementById('menuTrash');
  if (tm) tm.classList.toggle('active', view === 'trash');
  updateFab();
  save();
  if (view === 'diary') { renderDiaryView(); }
  else if (view === 'board') { renderBoardContent(); }
  else if (view === 'study') { renderStudyContent(); }
  else if (view === 'cafecito') { renderCafecitoContent(); }
  else if (view === 'trash') { renderTrashContent(); }
  else { renderNoteContent(); }
}

function renderAll() {
  renderNoteContent();
  renderBoardContent();
  renderStudyContent();
  renderCafecitoContent();
  var view = state.view || 'notes';
  var inDiaryNote = view === 'diary' && state.activeNoteId;
  document.getElementById('panelNotes').classList.toggle('hidden', view !== 'notes' && !inDiaryNote);
  document.getElementById('panelDiary').classList.toggle('hidden', view !== 'diary' || inDiaryNote);
  document.getElementById('panelBoard').classList.toggle('hidden', view !== 'board');
  document.getElementById('panelStudy').classList.toggle('hidden', view !== 'study');
  document.getElementById('panelCafecito').classList.toggle('hidden', view !== 'cafecito');
  document.getElementById('panelTrash').classList.toggle('hidden', view !== 'trash');
  renderTrashContent();
  document.getElementById('menuNotes').classList.toggle('active', view === 'notes');
  document.getElementById('menuBoard').classList.toggle('active', view === 'board');
  var dm = document.getElementById('menuDiary');
  if (dm) dm.classList.toggle('active', view === 'diary');
  var sm = document.getElementById('menuStudy');
  if (sm) sm.classList.toggle('active', view === 'study');
  var cm = document.getElementById('menuCafecito');
  if (cm) cm.classList.toggle('active', view === 'cafecito');
  var tm = document.getElementById('menuTrash');
  if (tm) tm.classList.toggle('active', view === 'trash');
  updateFab();
  if (view === 'diary' && !state.activeNoteId) renderDiaryCalendar();
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeMenu();
    closeDialog('newNoteDialog');
    closeDialog('newBoardDialog');
    closeDialog('unlockDialog'); closeDialog('settingsDialog');
    closeDialog('fullsizeOverlay');
    pendingUnlock = null; pendingDelete = null;
    cancelConnect();
    _exitEditMode();
    hideContextMenu();
    cleanupDrag();
  }
  // Enter in note items
  if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
    var el = e.target;
    if (el && el.classList && el.classList.contains('item-text') && el.isContentEditable) {
      if (el.closest('.list-item.text')) return; // text item: let default (new line)
      var sel = window.getSelection();
      var node = sel && sel.anchorNode;
      if (node) {
        if (node.nodeType === 3) node = node.parentNode;
        if (node.closest('li')) return;
      }
      e.preventDefault();
      var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
      if (!note) return;
      var idx = -1;
      note.items.forEach(function(item, i) { if (item.id === activeItemId) idx = i; });
      if (idx >= 0) {
        var curItem = note.items[idx];
        var sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
          var range = sel.getRangeAt(0);
          var preRange = document.createRange();
          preRange.setStart(el, 0);
          preRange.setEnd(range.startContainer, range.startOffset);
          var postRange = document.createRange();
          postRange.setStart(range.startContainer, range.startOffset);
          postRange.setEnd(el, el.childNodes.length);
          var beforeDiv = document.createElement('div');
          beforeDiv.appendChild(preRange.cloneContents());
          var afterDiv = document.createElement('div');
          afterDiv.appendChild(postRange.cloneContents());
          curItem.text = unparseNoteLinks(beforeDiv.innerHTML);
          var newItem = { id: genId(), text: unparseNoteLinks(afterDiv.innerHTML), checked: false, level: curItem.level, type: 'list' };
          note.items.splice(idx + 1, 0, newItem);
        } else {
          var newItem = { id: genId(), text: '', checked: false, level: curItem.level, type: 'list' };
          note.items.splice(idx + 1, 0, newItem);
        }
        save();
        renderNoteContent();
        var newIdx = idx + 1;
        var items = document.querySelectorAll('.list-item .item-text[contenteditable]');
        if (items.length > newIdx && newIdx >= 0) { items[newIdx].focus(); placeCaretAtEnd(items[newIdx]); }
      }
    }
  }
  // Backspace on empty item
  if (e.key === 'Backspace') {
    var el = e.target;
    if (el && el.classList && el.classList.contains('item-text') && el.isContentEditable) {
      if (el.textContent.trim() === '') {
        e.preventDefault();
        var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
        if (!note) return;
        var idx = -1;
        note.items.forEach(function(item, i) { if (item.id === activeItemId) idx = i; });
        if (idx > 0) {
          var prevId = note.items[idx - 1].id;
          deleteItem(state.activeNoteId, activeItemId);
          setTimeout(function() {
            var prevItem = document.querySelector('.list-item[data-id="' + prevId + '"]');
            if (prevItem) {
              var prevText = prevItem.querySelector('.item-text[contenteditable]');
              if (prevText) { prevText.focus(); placeCaretAtEnd(prevText); }
            }
          }, 10);
        }
      }
    }
  }
  // Format shortcuts
  if (e.ctrlKey && (e.key === 'b' || e.key === 'B')) { e.preventDefault(); formatBold(); }
  if (e.ctrlKey && (e.key === 'i' || e.key === 'I')) { e.preventDefault(); formatItalic(); }
  if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) { e.preventDefault(); formatUnderline(); }
});

/* Funciones para Eventos y Tareas */
function getDateStr(d) {
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}
function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function getNoteById(id) {
  return state.notes.find(function(n) { return n.id === id; });
}

function openReminderDialog() {
  var note = getNoteById(state.activeNoteId);
  if (!note) return;
  var isDiary = note.diary === true;
  var typeSel = document.getElementById('reminderType');
  var repeatSel = document.getElementById('reminderRepeat');
  document.getElementById('reminderTitle').value = '';
  typeSel.value = 'event';
  repeatSel.innerHTML = '';
  var opts;
  if (isDiary) {
    opts = [
      { value: 'none', label: t('noRepeat') },
      { value: 'weekly', label: t('everyWeek') },
      { value: 'monthly', label: t('everyMonth') },
      { value: 'yearly', label: t('everyYear') }
    ];
  } else {
    opts = [
      { value: 'none', label: t('noRepeat') },
      { value: 'daily', label: t('everyDay') }
    ];
  }
  opts.forEach(function(o) {
    var opt = document.createElement('option');
    opt.value = o.value;
    opt.textContent = o.label;
    repeatSel.appendChild(opt);
  });
  showDialog('dialogReminder');
  setTimeout(function(){ document.getElementById('reminderTitle').focus(); }, 100);
}

function createReminder() {
  var note = getNoteById(state.activeNoteId);
  if (!note) return;
  var title = document.getElementById('reminderTitle').value.trim();
  if (!title) {
    document.getElementById('reminderTitle').focus();
    return;
  }
  var type = document.getElementById('reminderType').value;
  var repeat = document.getElementById('reminderRepeat').value;
  var uuid = generateUUID();
  var refDate = Date.now();
  if (note.diary) {
    var parts = note.title.split('-').map(Number);
    if (parts.length === 3)
      refDate = new Date(parts[2], parts[1] - 1, parts[0]).getTime();
  }
  var obj = {
    uuid: uuid,
    title: title,
    repetition: repeat,
    createdAt: refDate
  };
  if (type === 'event') {
    obj.type = 'event';
    if (!note.events) note.events = [];
    note.events.push(obj);
  } else {
    obj.type = 'task';
    obj.status = 'pending';
    if (!note.tasks) note.tasks = [];
    note.tasks.push(obj);
  }
  closeDialog('dialogReminder');
  save();
  renderNoteContent();
  checkTodayNotifications();
}

function deleteReminder(noteId, uuid) {
  var note = getNoteById(noteId);
  if (!note) return;
  var idx, arr;
  if (note.events) {
    idx = -1;
    note.events.forEach(function(e, i) { if (e.uuid === uuid) idx = i; });
    if (idx >= 0) {
      note.events.splice(idx, 1);
      save();
      renderNoteContent();
      return;
    }
  }
  if (note.tasks) {
    idx = -1;
    note.tasks.forEach(function(t, i) { if (t.uuid === uuid) idx = i; });
    if (idx >= 0) {
      note.tasks.splice(idx, 1);
      save();
      renderNoteContent();
    }
  }
}

function toggleTaskStatus(noteId, uuid) {
  var note = getNoteById(noteId);
  if (!note || !note.tasks) return;
  var task = null;
  note.tasks.forEach(function(t) { if (t.uuid === uuid) task = t; });
  if (!task) return;
  task.status = task.status === 'completed' ? 'pending' : 'completed';
  save();
  renderNoteContent();
}

function shouldTriggerToday(element, today) {
  if (element.type === 'task' && element.status !== 'pending') return false;
  var created = new Date(element.createdAt);
  switch (element.repetition) {
    case 'none':
      if (element.type === 'event') return isSameDay(created, today);
      return element.status === 'pending';
    case 'daily':
      return true;
    case 'weekly':
      return created.getDay() === today.getDay();
    case 'monthly':
      return created.getDate() === today.getDate();
    case 'yearly':
      return created.getMonth() === today.getMonth() && created.getDate() === today.getDate();
    default:
      return false;
  }
}
function repetitionMatchesToday(element, today) {
  var created = new Date(element.createdAt);
  switch (element.repetition) {
    case 'none':
      return isSameDay(created, today);
    case 'daily':
      return true;
    case 'weekly':
      return created.getDay() === today.getDay();
    case 'monthly':
      return created.getDate() === today.getDate();
    case 'yearly':
      return created.getMonth() === today.getMonth() && created.getDate() === today.getDate();
    default:
      return false;
  }
}

function checkTodayNotifications() {
  if (typeof Capacitor !== 'undefined' && Capacitor.Plugins && Capacitor.Plugins.LocalNotifications) {
    Capacitor.Plugins.LocalNotifications.checkPermissions().then(function(perm) {
      if (perm.display === 'granted') {
        doCheckNotifications();
      } else {
        Capacitor.Plugins.LocalNotifications.requestPermissions().then(function(p) {
          if (p.display === 'granted') doCheckNotifications();
        }).catch(function() {});
      }
    }).catch(function() {});
  }
}

function doCheckNotifications() {
  var today = new Date();
  var todayStr = getDateStr(today);
  var hour = today.getHours();
  var notifications = [];
  var notifIndex = 0;

  state.notes.forEach(function(note) {
    (note.events || []).forEach(function(ev) {
      if (!shouldTriggerToday(ev, today)) return;
      if (!ev._lastNotified) ev._lastNotified = '';
      if (!ev._notifiedAfternoon) ev._notifiedAfternoon = false;
      if (ev._lastNotified !== todayStr) {
        ev._lastNotified = todayStr;
        ev._notifiedAfternoon = false;
        if (hour >= 12) ev._notifiedAfternoon = true;
      } else if (!ev._notifiedAfternoon && hour >= 12) {
        ev._notifiedAfternoon = true;
      } else {
        return;
      }
      notifications.push({
        id: _notifIdCounter++,
        title: t('event') + ': ' + ev.title,
        body: note.title,
        schedule: { at: new Date(Date.now() + 3000 + notifIndex++ * 500) },
        data: { noteId: note.id, uuid: ev.uuid }
      });
    });
    (note.tasks || []).forEach(function(tk) {
      if (tk.status !== 'pending') return;
      if (!shouldTriggerToday(tk, today)) return;
      if (!tk._lastNotified) tk._lastNotified = '';
      if (!tk._notifiedAfternoon) tk._notifiedAfternoon = false;
      if (tk._lastNotified !== todayStr) {
        tk._lastNotified = todayStr;
        tk._notifiedAfternoon = false;
        if (hour >= 12) tk._notifiedAfternoon = true;
      } else if (!tk._notifiedAfternoon && hour >= 12) {
        tk._notifiedAfternoon = true;
      } else {
        return;
      }
      notifications.push({
        id: _notifIdCounter++,
        title: t('task') + ': ' + tk.title,
        body: note.title,
        schedule: { at: new Date(Date.now() + 3000 + notifIndex++ * 500) },
        data: { noteId: note.id, uuid: tk.uuid }
      });
    });
  });

  if (notifications.length > 0) {
    Capacitor.Plugins.LocalNotifications.schedule({
      notifications: notifications
    }).catch(function(err) {
      console.warn('Error scheduling notifications:', err);
    });
    save();
  }
}

function openNoteById(noteId) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  state.activeNoteId = noteId;
  state.view = note.diary ? 'diary' : 'notes';
  if (note.diary) {
    var parts = note.title.split('-');
    if (parts.length === 3) {
      var d = parseInt(parts[0], 10), m = parseInt(parts[1], 10) - 1, y = parseInt(parts[2], 10);
      _calMonth = m;
      _calYear = y;
      _calSelectedDay = { day: d, month: m, year: y };
    }
  }
  save();
  renderAll();
}

function cancelNoteNotifications(noteId) {
  if (typeof Capacitor !== 'undefined' && Capacitor.Plugins && Capacitor.Plugins.LocalNotifications) {
    Capacitor.Plugins.LocalNotifications.cancel({
      notifications: [{ id: noteId }]
    }).catch(function() {});
  }
}

/* Registrar listener para apertura desde notificaciones */
if (typeof Capacitor !== 'undefined' && Capacitor.Plugins && Capacitor.Plugins.LocalNotifications) {
  Capacitor.Plugins.LocalNotifications.addListener(
    'localNotificationActionPerformed', function(notification) {
      var noteId = notification.notification.data.noteId;
      if (noteId) openNoteById(noteId);
    }
  );
}

/* paste detection for lists */
document.addEventListener('paste', function(e) {
  var el = e.target;
  if (!el || !el.classList || !el.classList.contains('item-text') || !el.isContentEditable) return;
  if (!state.activeNoteId) return;
  var text = (e.clipboardData || window.clipboardData).getData('text/plain');
  if (!text) return;
  var lines = text.split('\n').filter(function(l) { return l.trim().length > 0; });
  if (lines.length < 2) return;
  e.preventDefault();
  var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
  if (!note) return;
  var idx = -1;
  note.items.forEach(function(item, i) { if (item.id === activeItemId) idx = i; });
  if (idx < 0) return;
  var itemType = note.items[idx].type === 'text' ? 'text' : 'list';
  var cleaned = lines.map(function(l) {
    return l.replace(/^[-*+]\s+/, '').replace(/^\d+[.)]\s+/, '').replace(/^\[[ x]\]\s+/, '').trim();
  });
  note.items[idx].text = cleaned[0];
  for (var i = 1; i < cleaned.length; i++) {
    note.items.splice(idx + i, 0, { id: genId(), text: cleaned[i], checked: false, level: 0, type: itemType });
  }
  save();
  renderNoteContent();
  var newIdx = idx + cleaned.length - 1;
  var domItems = document.querySelectorAll('.list-item .item-text[contenteditable]');
  if (domItems.length > newIdx) { domItems[newIdx].focus(); placeCaretAtEnd(domItems[newIdx]); }
});

/* Week start */
function setWeekStart(val) {
  state.weekStartsMonday = (val === 'monday');
  save();
  renderCalendarGrid();
}

/* Default board bg */
function setDefaultBoardBg(val) {
  state.defaultBoardBg = val;
  state.boards.forEach(function(b) { b.boardBg = val; });
  save();
  if (state.activeBoardId) renderBoardContent();
}

/* Board shadows toggle */
function toggleBoardShadows() {
  state.boardShowShadows = !state.boardShowShadows;
  save();
  updateSettingsToggleStates();
  var board = state.boards.find(function(b) { return b.id === state.activeBoardId; });
  if (board) renderBoardContent();
}

/* Board animations toggle */
function toggleBoardAnimations() {
  state.boardShowAnimations = !state.boardShowAnimations;
  save();
  updateSettingsToggleStates();
  var board = state.boards.find(function(b) { return b.id === state.activeBoardId; });
  if (board) renderBoardContent();
}

/* Update toggle visual states in settings */
function updateSettingsToggleStates() {
  // Shadows toggle
  var st = document.getElementById('boardShadowsToggle');
  if (st) st.classList.toggle('active', state.boardShowShadows !== false);
  // Animations toggle
  var at = document.getElementById('boardAnimationsToggle');
  if (at) at.classList.toggle('active', state.boardShowAnimations !== false);
  // Week start select
  var ws = document.getElementById('weekStartSelect');
  if (ws) ws.value = state.weekStartsMonday ? 'monday' : 'sunday';
  // Default board bg buttons
  var bgBtns = document.getElementById('boardBgBtns');
  if (bgBtns) {
    var btns = bgBtns.querySelectorAll('.bg-btn');
    var currentBg = state.defaultBoardBg || 'cork';
    for (var i = 0; i < btns.length; i++) { btns[i].classList.toggle('active', btns[i].getAttribute('data-bg') === currentBg); }
  }
}

/* Stats */
function showStatsDialog() {
  var content = document.getElementById('statsContent');
  if (!content) return;
  var totalNotes = state.notes ? state.notes.length : 0;
  var totalBoards = state.boards ? state.boards.length : 0;
  var totalStudySets = state.studySets ? state.studySets.length : 0;
  var totalPostits = 0;
  if (state.boards) state.boards.forEach(function(b) { totalPostits += (b.postits ? b.postits.length : 0) + ((b.elements && b.elements.length) || 0); });
  var totalReminders = 0;
  if (state.notes) state.notes.forEach(function(n) { totalReminders += ((n.events ? n.events.length : 0) + (n.tasks ? n.tasks.length : 0)); });
  var totalWords = 0;
  if (state.notes) state.notes.forEach(function(n) {
    if (n.items) n.items.forEach(function(item) { if (item.text) totalWords += item.text.split(/\s+/).filter(function(w) { return w.length > 0; }).length; });
    if (n.title) totalWords += n.title.split(/\s+/).filter(function(w) { return w.length > 0; }).length;
  });
  content.innerHTML =
    '<div class="stats-row"><span class="stats-label">' + t('totalNotes') + '</span><span class="stats-value">' + totalNotes + '</span></div>' +
    '<div class="stats-row"><span class="stats-label">' + t('totalBoards') + '</span><span class="stats-value">' + totalBoards + '</span></div>' +
    '<div class="stats-row"><span class="stats-label">' + t('totalStudySets') + '</span><span class="stats-value">' + totalStudySets + '</span></div>' +
    '<div class="stats-row"><span class="stats-label">' + t('totalPostits') + '</span><span class="stats-value">' + totalPostits + '</span></div>' +
    '<div class="stats-row"><span class="stats-label">' + t('totalReminders') + '</span><span class="stats-value">' + totalReminders + '</span></div>' +
    '<div class="stats-row"><span class="stats-label">' + t('totalWords') + '</span><span class="stats-value">' + totalWords + '</span></div>';
  showDialog('statsDialog');
}

/* About */
function showAboutDialog() {
  var content = document.getElementById('aboutContent');
  if (!content) return;
  var html = '';
  html += '<div class="about-section"><h4>' + t('versionLabel') + '</h4><div>1.0.0</div></div>';
  html += '<div class="about-section"><h4>' + t('developer') + '</h4><div>AKSK Software</div></div>';
  html += '<div class="about-section"><h4>' + t('contact') + '</h4><div><a href="mailto:aksksoftware@gmail.com">aksksoftware@gmail.com</a></div></div>';
  html += '<div class="about-section"><h4>' + t('licenses') + '</h4>' +
    '<div class="about-license-item"><span class="about-license-name">@capacitor/core</span> <span class="about-license-text">MIT</span></div>' +
    '<div class="about-license-item"><span class="about-license-name">@capacitor/local-notifications</span> <span class="about-license-text">MIT</span></div>' +
    '<div class="about-license-item"><span class="about-license-name">MathJax</span> <span class="about-license-text">Apache 2.0</span></div>' +
    '<div class="about-license-item"><span class="about-license-name">html2canvas</span> <span class="about-license-text">MIT</span></div>' +
    '<div class="about-license-item"><span class="about-license-name">Font Awesome</span> <span class="about-license-text">CC BY 4.0</span></div>' +
    '</div>';
  html += '<div class="about-section"><h4>' + t('privacy') + '</h4><div>All data is stored locally in your device. No data is sent to any server. MiBabel does not collect, share, or sell any personal information.</div></div>';
  content.innerHTML = html;
  showDialog('aboutDialog');
}

document.addEventListener('mouseup', function() {
  setTimeout(updateFmtBar, 10);
});
document.addEventListener('keyup', function() {
  setTimeout(updateFmtBar, 10);
});
