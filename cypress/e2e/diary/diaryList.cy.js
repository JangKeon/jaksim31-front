describe('Diary List Test', () => {

    beforeEach(() => {
        // 로그인
        cy.visit('/home/landing');
        cy.wait(1500);
        cy.get('[data-cy="title"]', { timeout: 30000 }).should('be.visible');
        cy.get('[data-cy="startButton"]', { timeout: 30000 }).click();
        cy.wait(1500);
        cy.get('[data-cy="loginModal"]').should('be.visible');
        cy.get('[data-cy="loginEmailInput"]').clear();
        cy.get('[data-cy="loginEmailInput"]').type('test@sweep.com');
        cy.get('[data-cy="passwordInput"]').clear();
        cy.get('[data-cy="passwordInput"]').type('test1234!');
        cy.wait(1500);
        cy.get('[data-cy="loginSubmitButton"]', { timeout: 30000 }).click();

        // 일기 목록 페이지로 이동 
        cy.wait(3000);
        cy.get('[data-cy="drawerButton"]', { timeout: 30000 }).should('be.visible');
        cy.wait(3000);
        cy.get('[data-cy="drawerButton"]', { timeout: 30000 }).click();
        cy.wait(1500);
        cy.get('[data-cy="📅  일기 목록"] > .w-full', { timeout: 30000 }).click();
        cy.wait(1500);
    });

    // Calendar 형식 일기 목록 조회
    it('Calendar List', function() {

        // 캘린더 월 이동
        cy.get('.react-calendar__navigation__prev-button').click();
        cy.get('.react-calendar__navigation__prev-button').click();

        // 감정 필터링 선택 & reset
        cy.get('[data-cy="🤢 창피함"]').click();
        cy.get('[data-cy="🥰 좋음"]').click();
        cy.get('[data-cy="😶 감정없음"]').click();
        cy.get('[data-cy="resetEmotionButton"]').click();

        // 오늘 날짜로 이동
        cy.get('[data-cy="goTodayButton"]').click();
    });

    
    // Calendar 형식 일기 목록 조회
    it('Grid List', function() {
        
        // 썸네일 목록으로 이동
        cy.get('[data-cy="gridListTab"]').click();

        // 검색 옵션 
        cy.get('[data-cy="openFilterSearchBoxCheckbox"]', { timeout: 30000 }).check();
        cy.wait(1500);

        // 옵션 입력
        cy.get('[data-cy="searchWordInput"]').clear();
        cy.get('[data-cy="searchWordInput"]').type('날씨');
        cy.get('[data-cy="emotionSelectInput"]').select('😕 싫음');
        cy.get(':nth-child(1) > .react-datepicker-wrapper > .react-datepicker__input-container > .w-full').click();
        cy.get('.react-datepicker__day--029').click();
        cy.get(':nth-child(3) > .react-datepicker-wrapper > .react-datepicker__input-container > .w-full').click();
        cy.get('.react-datepicker__day--005').click();
        cy.get('[data-cy="sortInput"]').select('asc');
        cy.get('[data-cy="searchFilteredDataButton"]', { timeout: 30000 }).click();

        // 검색 초기화
        cy.get('[data-cy="resetFilterButton"]').click();
    });
})