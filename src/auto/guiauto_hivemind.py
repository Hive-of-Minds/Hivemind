import time
import pyautogui as pg
def click_image(imgname):
    clickimg = pg.locateOnScreen(imgname)
    while clickimg is None:
        clickimg = pg.locateOnScreen(imgname)

    clickquords = pg.center(clickimg)
    pg.click(clickquords.x, clickquords.y)
    
def start():
    time.sleep(5)
    click_image('first.PNG')
    click_image('second.PNG')
    time.sleep(60)
    click_image('third.PNG')
    pg.press('enter')

if __name__ == "__main__":
    start()
else:
    start()

